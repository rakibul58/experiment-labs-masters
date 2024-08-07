//AddFeedbackItemForm

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import DynamicForm from "./FormBuilder";

const AddFeedbackItemForm = ({
  setIsOpenFeedbackItemAddForm,
  UploadingImg,
  selectedFeedbackCategory,
  feedbackCategories,
  setSelectedFeedbackCategory,
  setFeedbackCategories,
  selectedCourse,
  userInfo,
  courseId,
  itemFeedbackSettingDetails,
}) => {
  const [course, setCourse] = useState();
  const [selectedRatingOption, setSelectedRatingOption] = useState("5");
  //const [selectedAccessOption, setSelectedAccessOption] = useState("Execution mentor");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFormRole, setShowFormRole] = useState("user");
  const [formFieldsForUser, setFormFieldsForUser] = useState([]);
  const [formFieldsForExpertMentor, setFormFieldsForExpertMentor] = useState(
    []
  );
  const [formFieldsForExecutionMentor, setFormFieldsForExecutionMentor] =
    useState([]);

  const handleRatingOptionChange = (event) => {
    setSelectedRatingOption(event.target.value);
  };
  /*   const handleAccessOptionChange = (event) => {
          setSelectedAccessOption(event.target.value);
      }; */
  const [selectedAccessOptions, setSelectedAccessOptions] = useState([]);

  const handleAccessOptionChange = (option) => {
    if (selectedAccessOptions.includes(option)) {
      // If the option is already selected, remove it
      setSelectedAccessOptions(
        selectedAccessOptions.filter((item) => item !== option)
      );
    } else {
      // If the option is not selected, add it to the selected options
      setSelectedAccessOptions([...selectedAccessOptions, option]);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks/courseId/${courseId}`
      )
      .then((response) => {
        setCourse(response?.data);
      })
      .catch((error) => console.error(error));
  }, [courseId]);
  console.log(course);

  const handleAddFeedbackItem = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (selectedFile) fileUrl = await uploadFileToS3(selectedFile);
    console.log({
      organizationId: userInfo?.organizationId,
      categoryName: selectedFeedbackCategory?.categoryName,
      courseId: selectedCourse?._id,
      feedbackItem: {
        feedbackItemName: event?.target?.feedbackItemName?.value,
        itemRating: selectedRatingOption,

        selectedIcon: fileUrl,
        giveAccess: selectedAccessOptions,
      },
    });
    if (
      selectedFeedbackCategory?.feedbackItems?.find(
        (item) =>
          item?.feedbackItemName === event?.target?.feedbackItemName?.value
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: itemFeedbackSettingDetails?.theItemNameIsAlreadyExist
          ? itemFeedbackSettingDetails?.theItemNameIsAlreadyExist
          : "The item name is already exist!",
      });
      return;
    }

    const newItem = await axios.post(
      //  `${process.env.REACT_APP_BACKEND_API}/feedbackItems`,
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/feedbackCategories/feedbackItems`,
      {
        organizationId: userInfo?.organizationId,
        categoryName: selectedFeedbackCategory?.categoryName,
        rating: selectedFeedbackCategory?.rating,
        courseId: selectedCourse?._id,
        feedbackItem: {
          feedbackItemName: event?.target?.feedbackItemName?.value,
          itemRating: selectedRatingOption,
          selectedIcon: fileUrl,
          giveAccess: selectedAccessOptions,
          userFormFields: formFieldsForUser,
          expertMentorFormFields: formFieldsForExpertMentor,
          executionMentorFormFields: formFieldsForExecutionMentor,
        },
      }
    );

    if (newItem?.data?.acknowledged) {
      toast.success(
        itemFeedbackSettingDetails?.itemAddedSuccessfully
          ? itemFeedbackSettingDetails?.itemAddedSuccessfully
          : "Item added Successfully"
      );
      const selectedCategoryItems = selectedFeedbackCategory?.feedbackItems
        ? [
            ...selectedFeedbackCategory?.feedbackItems,
            {
              feedbackItemName: event?.target?.feedbackItemName?.value,
              itemRating: selectedRatingOption,
            },
          ]
        : [
            {
              feedbackItemName: event?.target?.feedbackItemName?.value,
              itemRating: selectedRatingOption,
            },
          ];
      setSelectedFeedbackCategory({
        categoryName: selectedFeedbackCategory?.categoryName,
        rating: selectedFeedbackCategory?.rating,
        feedbackItems: selectedCategoryItems,
      });
      const otherCategories = feedbackCategories?.filter(
        (item) => selectedFeedbackCategory?.categoryName !== item?.categoryName
      );
      setFeedbackCategories([
        {
          categoryName: selectedFeedbackCategory?.categoryName,
          rating: selectedFeedbackCategory?.rating,
          feedbackItems: selectedCategoryItems,
        },
        ...otherCategories,
      ]);
      setIsOpenFeedbackItemAddForm(false);
      event.target.reset();
    }
  };
  return (
    <>
      <div className="px-4 my-[40px]">
        <div className=" border-[#B7B7B7] relative border p-8 rounded-lg ">
          <div className="absolute top-2 right-2 ">
            <button
              onClick={() => setIsOpenFeedbackItemAddForm(false)}
              className="flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]"
            >
              x
            </button>
          </div>
          <form onSubmit={handleAddFeedbackItem} className="w-full">
            <div className="flex">
              <div>
                <div
                  style={{
                    backgroundImage: `url(${UploadingImg})`,
                    background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`,
                  }}
                  className="h-[170px] w-[170px] flex flex-col justify-center items-center mt-2 rounded-lg"
                >
                  <img
                    className="h-[170px] w-[170px] rounded-lg"
                    src={UploadingImg}
                    alt="UploadingImg"
                  />
                  <p className="mt-[-60px] text-base font-semibold text-[#fff] mb-4">
                    {itemFeedbackSettingDetails?.uploadIcon
                      ? itemFeedbackSettingDetails?.uploadIcon
                      : "Upload Icon"}
                  </p>

                  <label
                    className="mt-[-16px] flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold"
                    htmlFor="input-file-upload"
                  >
                    {itemFeedbackSettingDetails?.browser
                      ? itemFeedbackSettingDetails?.browser
                      : "Browser"}
                  </label>
                  <input
                    className="w-[1%]"
                    style={{ fontSize: "0", opacity: "0" }}
                    type="file"
                    accept="image/*"
                    name="input-file-upload"
                    id="input-file-upload"
                    onChange={handleFileChange}
                    multiple
                  />
                </div>
              </div>

              <div className="w-full pl-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 mt-2 sm:grid-cols-2 w-full">
                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                      {itemFeedbackSettingDetails?.feedbackCategory
                        ? itemFeedbackSettingDetails?.feedbackCategory
                        : "Feedback Category"}
                    </label>
                    <select
                      onChange={(e) =>
                        setSelectedFeedbackCategory(
                          feedbackCategories?.find(
                            (category) =>
                              category?.categoryName === e.target.value
                          )
                        )
                      }
                      name="redemptionCategory"
                      id="redemptionCategory"
                      className="block w-full px-2 py-2 mt-2 bg-white rounded-md border border-[#B7B7B7] focus:border-sky-500 focus:outline-none focus:ring"
                    >
                      <option value={selectedFeedbackCategory?.categoryName}>
                        {selectedFeedbackCategory?.categoryName}
                      </option>
                      {feedbackCategories?.map((redemptionCategory) => (
                        <>
                          {redemptionCategory?.categoryName !==
                            selectedFeedbackCategory?.categoryName && (
                            <option value={redemptionCategory?.categoryName}>
                              {redemptionCategory?.categoryName}
                            </option>
                          )}
                        </>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                      {itemFeedbackSettingDetails?.feedbackItemName
                        ? itemFeedbackSettingDetails?.feedbackItemName
                        : "Feedback Item Name"}
                    </label>
                    <input
                      id="feedbackItemName"
                      name="feedbackItemName"
                      placeholder="Feedback Item"
                      className="block w-full p-2 mt-2 rounded-md bg-white border border-[#B7B7B7] focus:border-sky-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div className=" flex flex-col justify-center ">
                    <p className="font-semibold text-[#000000]  py-2">
                      {itemFeedbackSettingDetails?.itemRating
                        ? itemFeedbackSettingDetails?.itemRating
                        : "Item Rating"}
                    </p>
                    <div className=" flex gap-7 items-center  h-[40px]   text-[#535353] ">
                      <div className="flex items-center">
                        <input
                          id="5"
                          className="peer/draft me-2 "
                          type="radio"
                          name="status"
                          value="5"
                          checked={selectedRatingOption === "5"}
                          onChange={handleRatingOptionChange}
                        />
                        <label
                          for="5"
                          className="peer-checked/draft: font-normal"
                        >
                          5
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="10"
                          class="peer/published me-2"
                          type="radio"
                          name="status"
                          value="10"
                          checked={selectedRatingOption === "10"}
                          onChange={handleRatingOptionChange}
                        />
                        <label
                          for="10"
                          class="peer-checked/published: font-normal"
                        >
                          10
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-[#000000] py-2">
                      {itemFeedbackSettingDetails?.giveAccess
                        ? itemFeedbackSettingDetails?.giveAccess
                        : "Give Access"}
                    </p>
                    <div className="flex gap-7 items-center h-[40px] text-[#535353]">
                      <div className="flex items-center">
                        <input
                          id="ExecutionMentor"
                          className="peer/draft me-2"
                          type="checkbox"
                          name="ExecutionMentor"
                          value="Execution mentor"
                          checked={selectedAccessOptions.includes(
                            "Execution mentor"
                          )}
                          onChange={() =>
                            handleAccessOptionChange("Execution mentor")
                          }
                        />
                        <label
                          htmlFor="ExecutionMentor"
                          className="peer-checked/draft: font-normal"
                        >
                          {itemFeedbackSettingDetails?.executionMentor
                            ? itemFeedbackSettingDetails?.executionMentor
                            : "Execution mentor"}
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="ExpertMentor"
                          className="peer/published me-2"
                          type="checkbox"
                          name="ExpertMentor"
                          value="Expert mentor"
                          checked={selectedAccessOptions.includes(
                            "Expert mentor"
                          )}
                          onChange={() =>
                            handleAccessOptionChange("Expert mentor")
                          }
                        />
                        <label
                          htmlFor="ExpertMentor"
                          className="peer-checked/published: font-normal"
                        >
                          {itemFeedbackSettingDetails?.expertMentor
                            ? itemFeedbackSettingDetails?.expertMentor
                            : "Expert mentor"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-x-4 mt-5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowFormRole("user");
                    }}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                      showFormRole === "user"
                        ? "bg-sky-500 hover:bg-sky-700 focus:ring-sky-400"
                        : "bg-gray-400 hover:bg-gray-500 focus:ring-gray-300"
                    }`}
                  >
                    Students
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowFormRole("execution mentor");
                    }}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                      showFormRole === "execution mentor"
                        ? "bg-sky-500 hover:bg-sky-700 focus:ring-sky-400"
                        : "bg-gray-400 hover:bg-gray-500 focus:ring-gray-300"
                    }`}
                  >
                    Execution Mentor
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowFormRole("expert mentor");
                    }}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                      showFormRole === "expert mentor"
                        ? "bg-sky-500 hover:bg-sky-700 focus:ring-sky-400"
                        : "bg-gray-400 hover:bg-gray-500 focus:ring-gray-300"
                    }`}
                  >
                    Expert Mentor
                  </button>
                </div>
                {showFormRole === "user" && (
                  <DynamicForm
                    formFields={formFieldsForUser}
                    setFormFields={setFormFieldsForUser}
                  />
                )}
                {showFormRole === "execution mentor" && (
                  <DynamicForm
                    formFields={formFieldsForExecutionMentor}
                    setFormFields={setFormFieldsForExecutionMentor}
                  />
                )}
                {showFormRole === "expert mentor" && (
                  <DynamicForm
                    formFields={formFieldsForExpertMentor}
                    setFormFields={setFormFieldsForExpertMentor}
                  />
                )}

                <div className=" mt-5  ">
                  <input
                    type="submit"
                    value={
                      itemFeedbackSettingDetails?.proceed
                        ? itemFeedbackSettingDetails?.proceed
                        : "Proceed"
                    }
                    className="bg-[#2EB0FB] cursor-pointer rounded-lg p-2 font-semibold text-[#fff]"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-[#001E75] flex justify-center items-center h-[40px] mx-5 rounded-b-3xl mb-5"></div>
      </div>
    </>
  );
};

export default AddFeedbackItemForm;
