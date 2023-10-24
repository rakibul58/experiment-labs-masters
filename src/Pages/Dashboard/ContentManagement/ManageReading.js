import Layout from "../Layout";
import required from "../../../assets/ContentManagement/required.png";
import { useContext, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SkillBasedParameter from "./Components/Shared/SkillBasedParameter";
import ItemEarningParameter from "./Components/Shared/ItemEarningParameter";
import TextEditor from "../../Shared/TextEditor/TextEditor";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import { toast } from "react-hot-toast";
import ReadingTask from "../Week/ReadingTask";
import CompletionParameter from "./Components/Shared/CompletionParameter";

const ManageReading = () => {
  // upload file
  const [dragActive, setDragActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // ----   code by shihab   ----
  const { user, userInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [chapter, setChapter] = useState({});
  const [skillCategories, setSkillCategories] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [skillParameterData, setSkillParameterData] = useState([]);
  const [earningParameterData, setEarningParameterData] = useState([]);
  const [readingMaterial, setReadingMaterial] = useState("");
  const [course, setCourse] = useState({});
  const [preview, setPreview] = useState(false);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [readingData, setReadingData] = useState({});
  const [completionParameter, setCompletionParameter] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
      .then((response) => {
        setChapter(response?.data);
        const fetchData = {
          organizationId: userInfo?.organizationId,
          courseId: response?.data?.courseId,
        };
        if (fetchData && userInfo?.organizationId && chapter?.courseId) {
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_API}/skillCategoriesByCourseId`,
              fetchData
            )
            .then((res) => setSkillCategories(res?.data))
            .catch((error) => console.error(error));
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_API}/itemCategoryByCourseId`,
              fetchData
            )
            .then((res) => setEarningCategories(res?.data))
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  }, [id, userInfo, userInfo?.email]);

  useEffect(() => {
    if (chapter?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/courses/${chapter?.courseId}`
        )
        .then((response) => {
          setCourse(response?.data);
        });
  }, [chapter]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/batches/courseId/${chapter?.courseId}`
      )
      .then((response) => {
        setBatchesData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [chapter]);

  const handleOptionChangeBatch = (event, optionValue) => {
    // const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedBatches([
        ...selectedBatches,
        { batchName: optionValue?.batchName, batchId: optionValue?._id },
      ]);
    } else {
      setSelectedBatches(
        selectedBatches.filter((option) => option?.batchId !== optionValue?._id)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    let fileUrl = "";
    if (selectedFile) fileUrl = await uploadFileToS3(selectedFile);
    const readingTopicName = form.readingTopicName?.value;

    const manageReading = {
      readingTopicName,
      taskName: readingTopicName,
      additionalFiles: fileUrl,
      skillParameterData: skillParameterData,
      earningParameterData: earningParameterData,
      readingMaterial: readingMaterial,
      chapterId: id,
      completionParameter: completionParameter,
      courseId: chapter?.courseId,
      batches: selectedBatches,
    };

    setReadingData(manageReading);
    console.log(manageReading);

    if (submitPermission) {
      const newTask = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/readings`,
        manageReading
      );
      console.log(newTask);

      if (newTask?.data?.result?.acknowledged) {
        toast.success("Reading material added Successfully!");
        event.target.reset();
      }

      console.log(manageReading);
    }
  };

  console.log(selectedBatches);

  return (
    <div>
      <Layout>
        <div>
          <div className=" border-b-2 ">
            <div className="container mx-auto px-4 flex items-center justify-between ">
              <div className="flex items-center pt-[30px] pb-[30px] ">
                <Link
                  to="/courseAccess"
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  My Courses
                </Link>
                <svg
                  className="mr-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 18.667L15 12.667L9 6.66699"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Link
                  to={`/questLevels/${course?._id}`}
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  {course?.courseFullName}
                </Link>
                <svg
                  className="mr-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 18.667L15 12.667L9 6.66699"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <button className=" font-sans mr-[30px] text-[20px] font-[400] ">
                  {chapter?.chapterName}
                </button>
              </div>
              <div className="flex items-center mt-[-10px] ">
                <div className="flex items-center text-black text-[16px] font-[600] mr-[32px] ">
                  <h1 className="mr-[16px]">Preview Mode</h1>
                  {preview ? (
                    <svg
                      className="cursor-pointer"
                      onClick={() => setPreview(!preview)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="27"
                      viewBox="0 0 58 27"
                      fill="none"
                    >
                      <rect
                        width="57.8422"
                        height="26.7841"
                        rx="13.392"
                        fill="#9747FF"
                      />
                      <circle
                        cx="44.4512"
                        cy="13.3916"
                        r="10.1153"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="cursor-pointer"
                      onClick={() => setPreview(!preview)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="28"
                      viewBox="0 0 58 28"
                      fill="none"
                    >
                      <rect
                        y="0.608398"
                        width="57.8422"
                        height="26.7841"
                        rx="13.392"
                        fill="#A3A3A3"
                      />
                      <circle cx="13.3926" cy="14" r="10.1153" fill="white" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${preview ? "block" : "hidden"}`}>
          <ReadingTask readingData={readingData} />
        </div>
        <div className={`${preview ? "hidden" : "block"}`}>
          <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
            <p>Manage Reading in {chapter?.chapterName}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex  me-20 py-[35px] ps-[40px]">
              <div className="w-full">
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Reading Topic Name
                    </p>
                    <img src={required} alt="required" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="readingTopicName"
                    type="text"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                </div>

                <div className="mt-12 flex flex-col">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Additional Files{" "}
                    </p>
                  </div>

                  <div
                    className="w-3/4 h-[253px] bg-[#F6F7FF] flex flex-col items-center justify-center rounded-b-lg mt-6 ms-6"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{
                      border: "0.917px dashed #000",
                      background: "#F6F7FF",
                    }}
                  >
                    {dragActive ? (
                      <>
                        <CloudUploadIcon />
                        <p className="text-[17px] font-semibold mt-3 mb-3">
                          Drag and drop{" "}
                        </p>
                        <p className="text-sm font-medium mb-3">Or</p>
                      </>
                    ) : (
                      selectedFile && <p>Selected file: {selectedFile.name}</p>
                    )}
                    {!selectedFile && (
                      <>
                        <div className="flex gap-2 justify-center w-full">
                          <label
                            className="flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold"
                            htmlFor="input-file-upload"
                          >
                            Browser
                          </label>
                          <input
                            className="w-[1%]"
                            style={{ fontSize: "0", opacity: "0" }}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            name="input-file-upload"
                            id="input-file-upload"
                            onChange={handleFileChange}
                            multiple
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center gap-4">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]">
                    Reading Material{" "}
                  </p>
                  <img src={required} alt="required" />
                </div>

                {/* Text editor */}
                <div className="py-4">
                  <div className="bg-white text-black">
                    <TextEditor setValue={setReadingMaterial} />
                  </div>
                </div>
                {/* <p>{instructions}</p>
              <div dangerouslySetInnerHTML={{ __html: instructions }} /> */}
              </div>
            </div>
            <div className="me-20 py-[35px] ps-[40px]">
              <div>
                <div className="flex items-center gap-4">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]">Select Batch</p>
                  <img src={required} alt="required" />
                </div>
                <ul className="flex gap-4 flex-wrap ">
                  {batchesData?.map((option, index) => {
                    return (
                      <>
                        <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                          <input
                            type="checkbox"
                            id="student"
                            name={option?.batchName}
                            value={option?.batchName}
                            checked={selectedBatches.find(
                              (item) => item?.batchName === option?.batchName
                            )}
                            onChange={(e) => handleOptionChangeBatch(e, option)}
                            className=" mb-1"
                          />
                          <div className="flex mb-1 items-center">
                            <label className="ms-4" htmlFor={option?.batchName}>
                              {option?.batchName}
                            </label>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="px-4 my-10">
              <p className="text-[25px] font-bold mb-10">
                Evaluation Parameter
              </p>
              <SkillBasedParameter
                selectedData={skillParameterData}
                setSelectedData={setSkillParameterData}
                categories={skillCategories}
              />
              <ItemEarningParameter
                selectedData={earningParameterData}
                setSelectedData={setEarningParameterData}
                categories={earningCategories}
              />
            </div>

            <div className="px-4 my-10">
              <CompletionParameter
                setCompletionParameter={setCompletionParameter}
              />
            </div>

            <div className="flex items-center justify-center mt-20 mb-10">
              <input
                type="submit"
                value="Save"
                className="px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
              />
              <input
                type="submit"
                onClick={() => setSubmitPermission(true)}
                value="Save & Display"
                className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
              />
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default ManageReading;
