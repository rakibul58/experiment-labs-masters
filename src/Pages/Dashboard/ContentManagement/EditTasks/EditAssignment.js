import React, { useContext, useEffect, useState } from "react";
import arrowDown from "../../../../assets/SkillsManagement/arrow.svg";
import arrowright from "../../../../assets/SkillsManagement/arrowright.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "../../Layout";
import { AuthContext } from "../../../../contexts/AuthProvider";
import uploadFileToS3 from "../../../UploadComponent/s3Uploader";
import AssignmentTask from "../../Week/AssignmentTask";
import SkillBasedParameter from "../Components/Shared/SkillBasedParameter";
import ItemEarningParameter from "../Components/Shared/ItemEarningParameter";
import General from "../Components/Assignment/General";
import Loading from "../../../Shared/Loading/Loading";

const EditAssignment = () => {
  const [isOpenGeneral, setisOpenGeneral] = useState(true);

  const [isOpenEvaluationParameter, setisOpenEvaluationParameter] =
    useState(false);

  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleDropdownGeneral = () => {
    setisOpenGeneral(!isOpenGeneral);
  };

  const toggleDropdownevaluationParameter = () => {
    setisOpenEvaluationParameter(!isOpenEvaluationParameter);
  };

  // ----   code by shihab   ----
  const { userInfo } = useContext(AuthContext);
  const [chapter, setChapter] = useState({});
  const [skillCategories, setSkillCategories] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [skillParameterData, setSkillParameterData] = useState([]);
  const [earningParameterData, setEarningParameterData] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [course, setCourse] = useState({});
  const [preview, setPreview] = useState(false);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [assignmentData, setAssignmentData] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [contentStage, setContentStage] = useState([]);
  const [orgData, setOrgData] = useState({});
  const [taskDrip, setTaskDrip] = useState(false);
  const [executionMentors, setExecutionMentors] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [autoEvaluation, setAutoEvaluation] = useState(false);
  const [autoEvaluationInstructions, setAutoEvaluationInstructions] =
    useState("");

  useEffect(() => {
    if (id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/assignments/taskId/${id}`
        )
        .then((response) => {
          setAssignmentData(response?.data);
          setSelectedBatches(
            response?.data?.batches ? response?.data?.batches : selectedBatches
          );
          setSelectedMentors(
            response?.data?.executionMentors
              ? response?.data?.executionMentors
              : selectedMentors
          );
          setSchedule(
            response?.data?.schedule ? response?.data?.schedule : schedule
          );
          setInstructions(
            response?.data?.instructions
              ? response?.data?.instructions
              : instructions
          );
          // setSelectedFile(response?.data?.file);
          setSkillParameterData(
            response?.data?.skillParameterData
              ? response?.data?.skillParameterData
              : skillParameterData
          );
          setEarningParameterData(
            response?.data?.earningParameterData
              ? response?.data?.earningParameterData
              : earningParameterData
          );
          setTaskDrip(
            response?.data?.taskDrip ? response?.data?.taskDrip : taskDrip
          );
          setContentStage(
            response?.data?.contentStage === undefined
              ? []
              : response?.data?.contentStage
          );
          setAutoEvaluation(
            response?.data?.autoEvaluation
              ? response?.data?.autoEvaluation
              : autoEvaluation
          );
          setAutoEvaluationInstructions(
            response?.data?.autoEvaluationInstructions
              ? response?.data?.autoEvaluationInstructions
              : autoEvaluationInstructions
          );
        });
  }, [id]);

  useEffect(() => {
    if (assignmentData?.chapterId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/${assignmentData?.chapterId}`
        )
        .then((res) => setChapter(res?.data))
        .catch((error) => console.error(error));
  }, [assignmentData]);

  useEffect(() => {
    const fetchData = {
      organizationId: userInfo?.organizationId,
      courseId: chapter?.courseId,
    };
    if (userInfo?.organizationId && chapter?.courseId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/skillCategories/organizationId/${fetchData?.organizationId}/courseId/${fetchData?.courseId}`,
          fetchData
        )
        .then((res) => setSkillCategories(res?.data))
        .catch((error) => console.error(error));
      axios
        .post(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/earningCategories/organizationId/${fetchData?.organizationId}/courseId/${fetchData?.courseId}`,
          fetchData
        )
        .then((res) => setEarningCategories(res?.data))
        .catch((error) => console.error(error));
    }
  }, [chapter, userInfo]);

  useEffect(() => {
    if (chapter?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${chapter?.courseId}`
        )
        .then((response) => {
          setCourse(response?.data);
        });
  }, [chapter]);

  useEffect(() => {
    if (course?._id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${course?._id}`
        )
        .then((response) => {
          setBatchesData(response?.data);
        })
        .catch((error) => console.error(error));
  }, [course]);

  useEffect(() => {
    if (userInfo?.organizationId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${userInfo?.organizationId}`
        )
        .then((response) => {
          setOrgData(response?.data);
        })
        .catch((error) => console.error(error));
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/mentors/organizationId/${userInfo?.organizationId}/role/execution mentor`
        // `http://localhost:5000/api/v1/users/mentors/organizationId/${userInfo?.organizationId}/role/execution mentor`
      )
      .then((response) => {
        setExecutionMentors(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userInfo]);

  const handleOptionChangeBatch = (event, optionValue) => {
    // const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (selectedBatches) {
        setSelectedBatches([
          ...selectedBatches,
          { batchName: optionValue?.batchName, batchId: optionValue?._id },
        ]);
        setSchedule([
          ...schedule,
          {
            batchName: optionValue?.batchName,
            batchId: optionValue?._id,
            assignmentStartingDateTime: "",
            assignmentEndingDateTime: "",
          },
        ]);
      } else {
        setSelectedBatches([
          { batchName: optionValue?.batchName, batchId: optionValue?._id },
        ]);
        setSchedule([
          {
            batchName: optionValue?.batchName,
            batchId: optionValue?._id,
            assignmentStartingDateTime: "",
            assignmentEndingDateTime: "",
          },
        ]);
      }
    } else {
      setSelectedBatches(
        selectedBatches.filter((option) => option?.batchId !== optionValue?._id)
      );
      setSchedule(
        schedule.filter((option) => option?.batchId !== optionValue?._id)
      );
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    Loading();
    let fileUrl = "";
    if (selectedFile) fileUrl = await uploadFileToS3(selectedFile);

    const form = event.target;

    const assignmentName = form.assignmentName?.value;
    const AssignmentStartingDateTime = form.AssignmentStartingDateTime?.value;
    const AssignmentEndingDateTime = form.AssignmentEndingDateTime?.value;
    const assignmentTotalPointsMarks = +form.assignmentTotalPointsMarks?.value;

    const manageAssignment = {
      assignmentName,
      taskName: assignmentName,
      AssignmentStartingDateTime,
      assignmentTotalPointsMarks,
      AssignmentEndingDateTime,
      instructions: instructions,
      file: selectedFile ? fileUrl : assignmentData?.file,
      skillParameterData: skillParameterData,
      earningParameterData: earningParameterData,
      chapterId: chapter?._id,
      batches: selectedBatches,
      schedule: schedule,
      contentStage,
      taskDrip,
      executionMentors: selectedMentors,
      autoEvaluation: autoEvaluation,
      autoEvaluationInstructions: autoEvaluationInstructions,
    };

    setAssignmentData(manageAssignment);

    if (submitPermission) {
      const newAssignment = await axios.put(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/assignments/taskId/${assignmentData?._id}`,
        manageAssignment
      );
      if (newAssignment?.data?.result?.acknowledged) {
        toast.success("Assignment edited Successfully");
        navigate(-1);
      }
    }
    Loading().close();
  };

  console.log(assignmentData?.chapterId);

  return (
    <div>
      <Layout>
        <div>
          <div className=" border-b-2 mt-20 lg:mt-0">
            <div className="container flex-col lg:flex-row gap-3 lg:gap-0 lg:mx-auto ml-4 px-4 flex items-center justify-between ">
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
              <div className="flex items-center mt-[-10px] lg:mb-0 mb-3 ">
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
          <AssignmentTask taskData={assignmentData} />
        </div>
        <div className={`${preview ? "hidden" : "block"}`}>
          <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
            <p>Manage Assignment in {chapter?.chapterName}</p>
          </div>
          <form onSubmit={handleSubmit} className="ms-[40px]  mt-12">
            <div
              className="select-option flex items-center gap-[40px]"
              onClick={toggleDropdownGeneral}
            >
              <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                1
              </h1>
              <p className="text-[25px] font-bold">General </p>
              {!isOpenGeneral && (
                <img className="w-6" src={arrowright} alt="" />
              )}

              {isOpenGeneral && <img src={arrowDown} alt="" />}

              <i
                className={`dropdown-arrow ${isOpenGeneral ? "open" : ""}`}
              ></i>
            </div>
            {isOpenGeneral && (
              <General
                batchesData={batchesData}
                selectedBatches={selectedBatches}
                schedule={schedule}
                setSchedule={setSchedule}
                handleOptionChangeBatch={handleOptionChangeBatch}
                setSelectedBatches={setSelectedBatches}
                assignmentData={assignmentData}
                instructions={instructions}
                setInstructions={setInstructions}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                contentStage={contentStage}
                setContentStage={setContentStage}
                enableDrip={course?.enableDrip}
                taskDrip={taskDrip}
                setTaskDrip={setTaskDrip}
                executionMentors={executionMentors}
                setExecutionMentors={setExecutionMentors}
                selectedMentors={selectedMentors}
                setSelectedMentors={setSelectedMentors}
                autoEvaluation={autoEvaluation}
                setAutoEvaluation={setAutoEvaluation}
                autoEvaluationInstructions={autoEvaluationInstructions}
                setAutoEvaluationInstructions={setAutoEvaluationInstructions}
              />
            )}
            {(orgData?.showPointsAndRedemptions ||
              orgData?.showSkillsManagement) && (
              <div
                className="select-option flex items-center gap-[40px] mt-12"
                onClick={toggleDropdownevaluationParameter}
              >
                <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                  2
                </h1>
                <p className="text-[25px] font-bold">Evaluation Parameter</p>
                {!isOpenEvaluationParameter && (
                  <img className="w-6" src={arrowright} alt="arrow" />
                )}

                {isOpenEvaluationParameter && (
                  <img src={arrowDown} alt="arrow" />
                )}

                <i
                  className={`dropdown-arrow ${
                    isOpenEvaluationParameter ? "open" : ""
                  }`}
                ></i>
              </div>
            )}
            {isOpenEvaluationParameter && (
              <div className="dropdown-menu mt-[71px] mb-[45px] ">
                {orgData?.showSkillsManagement && (
                  <SkillBasedParameter
                    forEdit={true}
                    selectedData={skillParameterData}
                    setSelectedData={setSkillParameterData}
                    categories={skillCategories}
                  />
                )}

                {orgData?.showPointsAndRedemptions && (
                  <ItemEarningParameter
                    forEdit={true}
                    selectedData={earningParameterData}
                    setSelectedData={setEarningParameterData}
                    categories={earningCategories}
                  />
                )}
              </div>
            )}

            <div className="flex items-center justify-center mt-20 mb-10">
              <input
                type="submit"
                value="Save"
                onClick={() => setSubmitPermission(true)}
                className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
              />
              {/* <input
                type="submit"
                value="Save & Display"
                className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
              /> */}
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default EditAssignment;
