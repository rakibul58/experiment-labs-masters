import required from "../../../../assets/ContentManagement/required.png";
import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Link, useParams } from "react-router-dom";
import TextEditor from "../../../Shared/TextEditor/TextEditor";
import axios from "axios";
import { toast } from "react-hot-toast";
import QuizResult from "../QuizResult";
import QuizEvaluationParameter from "../QuizEvaluationParameter";
import ManageQuestionBank from "../ManageQuestionBank";
import ManageQuestion from "../ManageQuestion";

const EditQuiz = () => {
  const [selectedTab, setSelectedTab] = useState("Quiz General Information");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const { id } = useParams();
  const [quizDescription, setQuizDescription] = useState("");
  const [submitPermission, setSubmitPermission] = useState(false);
  const [quizData, setQuizData] = useState({});
  const [chapter, setChapter] = useState({});
  const [course, setCourse] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/quizes/taskId/${id}`
      )
      .then((response) => {
        setQuizData(response?.data);
        setQuizDescription(response?.data?.quizDescription);
        setSelectedBatches(response?.data?.batches);
        // setSkillParameterData(response?.data?.skillParameterData);
        // setEarningParameterData(response?.data?.earningParameterData);
        // setTaskDrip(response?.data?.taskDrip);
        // setEnableDownload(response?.data?.enableDownload);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/chapter/${quizData?.chapterId}`
      )
      .then((response) => {
        setChapter(response?.data);
      })
      .catch((error) => console.error(error));
  }, [quizData]);

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

  console.log(quizData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedQuizObject = { ...quizData };
    updatedQuizObject.taskName = e.target.quizName.value;
    updatedQuizObject.quizName = e.target.quizName.value;
    updatedQuizObject.quizDescription = quizDescription;
    updatedQuizObject.quizAttempts = e.target.quizAttempts.value;
    updatedQuizObject.shuffleWithInQuestions =
      e.target.shuffleWithInQuestions.value;
    updatedQuizObject.points = e.target.points.value;
    updatedQuizObject.isMarksTotalPoints = e.target.isMarksTotalPoints.value;
    updatedQuizObject.marks = e.target.marks.value;
    updatedQuizObject.totalPoints = e.target.totalPoints.value;
    updatedQuizObject.gradeToPass = e.target.gradeToPass.value;
    updatedQuizObject.gradeToPassValueIn = e.target.gradeToPassValueIn.value;

    await setQuizData(updatedQuizObject);
    console.log(updatedQuizObject);

    if (submitPermission) {
      await delete updatedQuizObject?._id;
      const newQuiz = await axios.put(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/quizes/taskId/${quizData?._id}`,
        updatedQuizObject
      );

      if (newQuiz?.data?.acknowledged) {
        toast.success("Quiz Updated Successfully");
        e.target.reset();
      }
    }
  };

  console.log(quizData);

  return (
    <div>
      <Layout>
        <>
          <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
            <p>Manage Quiz in Topic 1</p>
          </div>
          <div className="px-10 flex  justify-between pb-3 text-lg">
            <button
              onClick={() => handleTabClick("Quiz General Information")}
              style={{
                fontWeight:
                  selectedTab === "Quiz General Information"
                    ? "bold"
                    : "normal",
                borderBottom:
                  selectedTab === "Quiz General Information"
                    ? "2px solid black"
                    : "none",
              }}
            >
              Quiz General Information
            </button>
            <button
              onClick={() => handleTabClick("Questions")}
              style={{
                fontWeight: selectedTab === "Questions" ? "bold" : "normal",
                borderBottom:
                  selectedTab === "Questions" ? "2px solid black" : "none",
              }}
            >
              Questions
            </button>
            <button
              onClick={() => handleTabClick("Question Bank")}
              style={{
                fontWeight: selectedTab === "Question Bank" ? "bold" : "normal",
                borderBottom:
                  selectedTab === "Question Bank" ? "2px solid black" : "none",
              }}
            >
              Question Bank
            </button>
            <button
              onClick={() => handleTabClick("Results")}
              style={{
                fontWeight: selectedTab === "Results" ? "bold" : "normal",
                borderBottom:
                  selectedTab === "Results" ? "2px solid black" : "none",
              }}
            >
              Results
            </button>
            <button
              onClick={() => handleTabClick("Evaluation Parameter")}
              style={{
                fontWeight:
                  selectedTab === "Evaluation Parameter" ? "bold" : "normal",
                borderBottom:
                  selectedTab === "Evaluation Parameter"
                    ? "2px solid black"
                    : "none",
              }}
            >
              Evaluation Parameter
            </button>
          </div>
        </>

        {selectedTab === "Quiz General Information" && (
          <div className="mx-10 my-20">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <div className="w-full">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Quiz Name</p>
                      <img src={required} alt="required" />
                    </div>

                    <input
                      required
                      defaultValue={quizData ? quizData?.quizName : ""}
                      className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="quizName"
                      type="text"
                      placeholder="Eg. Entrepreneurship Lab"
                    />
                  </div>

                  <div className=" mt-16">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Quiz Description
                      </p>
                    </div>

                    <div className="py-4 pr-5">
                      <div className="bg-white text-black textEditor">
                        <TextEditor
                          value={quizDescription}
                          setValue={setQuizDescription}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[80%]">
                    <div className="flex justify-between mt-16">
                      <div className=" ">
                        <div className="flex items-center gap-4">
                          <p className="h-2 w-2 bg-black rounded-full"></p>
                          <p className="font-semibold text-[#000000]  py-2">
                            Grade Method
                          </p>
                        </div>
                        <div
                          style={{
                            border: "1.085px solid #CECECE",
                            background: "#F6F7FF",
                          }}
                          className=" flex  border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] ms-5"
                        >
                          <select
                            required
                            className="w-full border-0 focus:outline-0 bg-[#F6F7FF] text-black"
                            name="gradeMethod"
                            id="gradeMethod"
                          >
                            <option className="text-black" value="Student">
                              Highest Grade
                            </option>
                            <option className="text-black" value="Parent">
                              Parent
                            </option>
                            <option className="text-black" value="Counselor">
                              Counselor
                            </option>
                            <option className="text-black" value="Others">
                              Others
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className=" ">
                        <div className="flex items-center gap-4">
                          <p className="h-2 w-2 bg-black rounded-full"></p>
                          <p className="font-semibold text-[#000000]  py-2">
                            Shuffle within Questions
                          </p>
                        </div>

                        <div className=" flex gap-7 items-center  h-[40px] ms-5   text-[#535353] ">
                          <div>
                            <input
                              id="draft"
                              className="peer/draft me-2 "
                              type="radio"
                              name="shuffleWithInQuestions"
                              checked
                            />
                            <label
                              for="draft"
                              className="peer-checked/draft: font-normal"
                            >
                              Yes
                            </label>
                          </div>

                          <div>
                            <input
                              id="published"
                              class="peer/published me-2"
                              type="radio"
                              name="shuffleWithInQuestions"
                            />
                            <label
                              for="published"
                              class="peer-checked/published: font-normal"
                            >
                              NO
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Quiz Total Points/Marks
                      </p>
                      <img src={required} alt="required" />
                    </div>

                    <input
                      required
                      defaultValue={quizData ? quizData?.points : ""}
                      className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="points"
                      type="number"
                      placeholder="Eg. Entrepreneurship Lab"
                    />
                  </div>

                  <div className="flex justify-between mt-16">
                    <div>
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-semibold text-[#000000]  py-2">
                          Quiz Attempts
                        </p>
                      </div>
                      <div
                        style={{
                          border: "1.085px solid #CECECE",
                          background: "#F6F7FF",
                        }}
                        className=" flex mx-5 mt-5 border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] "
                      >
                        <select
                          required
                          className="w-full border-0 focus:outline-0 bg-[#F6F7FF]"
                          name="quizAttempts"
                          id="quizAttempts"
                        >
                          <option className="" value="Unlimited">
                            Unlimited
                          </option>
                          <option className="" value="3">
                            3
                          </option>
                          <option className="" value="5">
                            5
                          </option>
                          <option className="" value="10">
                            10
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="ms-16">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-semibold text-[#000000]  py-2">
                          Grade to pass
                        </p>
                      </div>
                      <div className="flex gap-2 mt-5">
                        <div
                          style={{
                            border: "1.085px solid #CECECE",
                            background: "#F6F7FF",
                          }}
                          className=" flex  border  rounded-lg h-[40px] w-[20%] px-2 text-[#535353] "
                        >
                          <input
                            className="w-[100%] bg-[#F6F7FF]"
                            type="text"
                            name="gradeToPass"
                            id="gradeToPass"
                          />
                        </div>
                        <div
                          style={{
                            border: "1.085px solid #CECECE",
                            background: "#F6F7FF",
                          }}
                          className="flex items-center border  rounded-lg h-[40px] w-[40%] text-[#535353]"
                        >
                          <select
                            required
                            className=" border-0 focus:outline-0 bg-[#F6F7FF]"
                            name="gradeToPassValueIn"
                            id="gradeToPassValueIn"
                          >
                            <option className="" value="Percentage">
                              Percentage
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-16">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-semibold text-[#000000]  py-2">
                        Is Marks = Total Points?
                      </p>
                    </div>

                    <div className=" flex gap-7 items-center  h-[40px] ms-5  text-[#535353] ">
                      <div>
                        <input
                          id="draft"
                          className="peer/draft me-2 "
                          type="radio"
                          name="isMarksTotalPoints"
                          checked
                        />
                        <label
                          for="draft"
                          className="peer-checked/draft: font-normal"
                        >
                          Yes
                        </label>
                      </div>

                      <div>
                        <input
                          id="published"
                          class="peer/published me-2"
                          type="radio"
                          name="isMarksTotalPoints"
                        />
                        <label
                          for="published"
                          class="peer-checked/published: font-normal"
                        >
                          NO
                        </label>
                      </div>
                    </div>
                    <div className="flex mt-5">
                      <input
                        style={{
                          border: "1.085px solid #CECECE",
                          background: "#F6F7FF",
                        }}
                        className="border rounded px-4 py-2 w-[100px]"
                        type="text"
                        name="marks"
                        placeholder="Marks"
                      />
                      <p className="w-[50px] flex justify-center items-center font-bold">
                        =
                      </p>
                      <input
                        style={{
                          border: "1.085px solid #CECECE",
                          background: "#F6F7FF",
                        }}
                        className="border rounded px-4 py-2 "
                        type="text"
                        name="totalPoints"
                        placeholder="Total Points"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-[35px] ">
                <div>
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Select Batch</p>
                    <img src={required} alt="required" />
                  </div>
                  <ul className="ms-6 flex gap-4 flex-wrap ">
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
                              onChange={(e) =>
                                handleOptionChangeBatch(e, option)
                              }
                              className=" mb-1"
                            />
                            <div className="flex mb-1 items-center">
                              <label
                                className="ms-4"
                                htmlFor={option?.batchName}
                              >
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

              <div className="flex items-center justify-center mt-20 mb-10">
                <input
                  type="submit"
                  onClick={() => setSubmitPermission(true)}
                  value="Save"
                  className="px-[30px] cursor-pointer py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
                />
                {/* <input
                  type="submit"
                  onClick={() => setSubmitPermission(true)}
                  value="Save & Display"
                  className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
                /> */}
              </div>
            </form>
          </div>
        )}
        {selectedTab === "Results" && <QuizResult />}
        {selectedTab === "Evaluation Parameter" && <QuizEvaluationParameter />}
        {selectedTab === "Question Bank" && <ManageQuestionBank />}
        {selectedTab === "Questions" && (
          <ManageQuestion
            quizData={quizData}
            setQuizData={setQuizData}
            batchesData={batchesData}
            selectedBatches={selectedBatches}
          />
        )}
      </Layout>
    </div>
  );
};

export default EditQuiz;
