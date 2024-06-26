import { RouterProvider } from "react-router-dom";
import router from "./Router/Router/Router";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthProvider";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DynamicFavicon from "./DynamicFavicon";
import AWS from "aws-sdk";
import Loading from "./Pages/Shared/Loading/Loading";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
  region: process.env.REACT_APP_region,
  maxRetries: 3,
  httpOptions: { timeout: 30000, connectTimeout: 5000 },
});

// const s3 = new AWS.S3();
ReactGA.initialize("G-RL7TBN4FCW");
function App() {
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const orgLogo = localStorage.getItem("organizationLogo");
  const pWASplashscreenLogo = localStorage.getItem("pWASplashscreenLogo");
  const pWALogo = localStorage.getItem("pWALogo");
  /*   const [orgDetails, setOrgDetails] = useState({});

  const rootUrl = window.location.href;

  useEffect(() => {
    Loading();
    try {
      if (rootUrl) {
        axios
          .post(
            `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/findOrg`,
            {
              orgDefaultUrl: rootUrl,
            }
          )
          .then((response) => {
            console.log(response);
            setOrgDetails(response?.data?.organization);
            
            if (window.location.href === response?.data?.organization?.orgDefaultUrl && response?.data?.organization?.orgRootUrl !== response?.data?.organization?.orgDefaultUrl) {
              window.location.href = response?.data?.organization?.orgRootUrl;
              Loading().close();
              return;
            }
           

          });
      }
    } catch (error) {
      Loading().close();
      console.log(error);
    }
  }, [rootUrl]);
 */

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      fetchAndDisplayGoogleCalendarEvents();
    }
    // fetchPrimaryCalendarInfo();
    if (!userInfo) {
      return;
    }
    fetch(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${userInfo?.organizationId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        // Remove previous manifest if it exists
        const existingManifest = document.getElementById("manifest");
        if (existingManifest) {
          existingManifest.remove();
        }

        // Generate the dynamic manifest
        const manifest = {
          short_name: data?.organizationName,
          name: data?.organizationName,
          icons: [
            {
              src: "https://i.ibb.co/qCjt6fH/icon192.png",
              type: "image/png",
              sizes: "192x192",
              purpose: "maskable",
            },
            {
              src: "https://i.ibb.co/5K6F5M6/icon512.png",
              type: "image/png",
              sizes: "512x512",
            },
            {
              src: "https://i.ibb.co/nQL81Tw/icon64.png",
              type: "image/png",
              sizes: "64x64",
              purpose: "any",
            },
          ],
          start_url: "http://localhost:3000/",
          display: "standalone",
          theme_color: "#000000",
          background_color: "#000000",
          prefer_related_applications: true,
        };

        const dynamicJsonDataLink = document.createElement("link");
        dynamicJsonDataLink.id = "manifest";
        dynamicJsonDataLink.rel = "manifest";
        dynamicJsonDataLink.href = URL.createObjectURL(
          new Blob([JSON.stringify(manifest)], { type: "application/json" })
        );
        document.head.appendChild(dynamicJsonDataLink);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching organization data:", error);
        setIsLoading(false);
      });
  }, [userInfo, orgLogo]);

  if (isLoading) {
    return <div></div>;
  }
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  async function fetchGoogleCalendarEvents() {
    const currentDate = new Date().toISOString();
    const url = new URL(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events"
    );

    // Append parameters to the URL using URLSearchParams
    url.searchParams.append("timeMin", currentDate);
    url.searchParams.append("singleEvents", true);
    url.searchParams.append("orderBy", "startTime");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.provider_token,
      },
    });

    console.log(session);

    if (!response.ok) {
      throw new Error("Failed to fetch Google Calendar events");
    }

    const data = await response.json();
    console.log(data);
    return data.items || [];
  }

  async function fetchAndDisplayGoogleCalendarEvents() {
    try {
      const events = await fetchGoogleCalendarEvents();
      const adminEmail = events[0]?.creator?.email;
      const newEvent = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/updateEvent/${adminEmail}`,
        events
      );
      console.log(newEvent);
      if (newEvent?.data?.success) {
        console.log("Events updated");
      }
      setCalendarEvents(events);
    } catch (error) {
      console.error(error.message);
    }
  }
  //console.log(orgDetails);
  return (
    <div className="max-w-[1920px] mx-auto">
      <DynamicFavicon />
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
