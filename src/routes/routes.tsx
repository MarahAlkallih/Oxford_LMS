import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import { MainLayout } from "../components/Layout/MainLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import StaticsPage from "../pages/home/statics";
import SplashScreen from "../pages/splash/SplashScreen"
import { LanguagesPage } from "../pages/languages/LanguagesPage";
import UsersPage from "../pages/Users/Users"
import { AddUserPage } from "../pages/Users/AddUser"
import { DisplayUserInfo } from "../pages/Users/UserById";
import { TrainerPage } from "../pages/Users/AddTrainer";
import { TrainingPlanPage } from "../pages/Courses/TrainingPlan/TrainingPlan";
import { AddFiles } from "../pages/Courses/TrainingPlan/AddFiles";
import { TrainingPlanDetails } from "../pages/Courses/TrainingPlan/TrainingPlanDetails ";
import { VenuesPage } from "../pages/Courses/Venues/Venues";
import { LocationPage } from "../pages/Courses/Location/Location";
import { CatygoriesPage } from "../pages/Courses/category/CatygoriesPage";
import { Trainers } from "../pages/Users/Trainers";
import { TrainerInfo } from "../pages/Users/TrainerInfo";
import { TraineesPage } from "../pages/Users/Trainees";
import { TraineeInfo } from "../pages/Users/Trainee";
import { ExamConstants } from "../pages/Exams/ExamConstatnts/ExamConstatnt";
import { AddCoursePage } from "../pages/Courses/Course/AddCourse";
import { CoursesPage } from "../pages/Courses/Course/CoursesPage";
import { CourseDetails } from "../pages/Courses/Course/CourseDetails";
import { FormsPage } from "../pages/Exams/Forms/Form";
import { ExamInstances } from "../pages/Exams/Instances/Instances";
import { InstanceDetails } from "../pages/Exams/Instances/InstanceDetails";
import { QuestionForm } from "../components/Exam/Question/QuestionForm";
import { ExamPage } from "../pages/Exams/exams/ExaamPage";
import { EventsPage } from "../pages/Exams/Events/ExamEventPage";
import { EditQuestionPage } from "../components/Exam/Question/EditQuestionPage";
import { ExamDetails } from "../pages/Exams/exams/ExamDetails";
import { QuestionDetails } from "../pages/Exams/Instances/QuestionDetails";
import { EditUserPage } from "../pages/Users/EditUser";

function QuestionFormRoute() {
  const { id } = useParams();

  return <QuestionForm examInstanceId={Number(id)} />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/splash" replace />} />
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<StaticsPage />} />
        <Route path="/users/languages" element={<LanguagesPage />} />
        <Route path="users/display" element={<UsersPage/>}/>
        <Route path="users/display/:id" element={<DisplayUserInfo/>}/>
          <Route path="users/display/:id/edit" element={<EditUserPage/>}/>
        <Route path="users/add" element={<AddUserPage/>}/>
        <Route  path="users/trainer" element={<Trainers/>}    />
        <Route  path="users/trainer/:id" element={<TrainerInfo/>}    />
        <Route path="users/trainees" element={<TraineesPage/>} />
        <Route path="users/trainees/:id" element={<TraineeInfo/>} />
        <Route path="users/trainer/addtrainer" element={<TrainerPage/>} />
        <Route path="courses/training-plan" element={<TrainingPlanPage/>} />
        <Route path="courses/venues" element={<VenuesPage/>} />
        <Route path="courses/location" element={<LocationPage/>} />
        <Route path="courses/category" element={<CatygoriesPage/>} />
           <Route path="/courses/add-course" element={<AddCoursePage/>} />
            <Route path="/courses" element={<CoursesPage/>} />
            <Route path="/courses/:id" element={<CourseDetails/>} />
        <Route path="assignments/types" element={<ExamConstants/>} />
        <Route path="assignments/forms" element={<FormsPage/>} />
        <Route path="assignments/instances" element={<ExamInstances/>} />
        <Route path="assignments/instances/:id/addQuestion" element={<QuestionFormRoute />} />
        <Route path="/exam-instance/:examInstanceId/edit-question/:questionId" element={<EditQuestionPage/>} />
        <Route path="assignments/exams" element={<ExamPage/>} />
         <Route path="assignments/exams/:id" element={<ExamDetails/>} />
         <Route path="assignments/instances/:id/question/:questionId" element={<QuestionDetails/>} />
        <Route path="assignments/events" element={<EventsPage/>} />
        <Route path="assignments/instances/:id" element={<InstanceDetails/>} />
         <Route path="courses/training-plan/add-files" element={<AddFiles/>} />
         <Route path="courses/training-plan/:id" element={<TrainingPlanDetails />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;