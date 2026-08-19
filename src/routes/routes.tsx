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
import { TrainerPage } from "../pages/Users/Trainers/AddTrainer";
import { TrainingPlanPage } from "../pages/Courses/TrainingPlan/TrainingPlan";
import { AddFiles } from "../pages/Courses/TrainingPlan/AddFiles";
import { TrainingPlanDetails } from "../pages/Courses/TrainingPlan/TrainingPlanDetails ";
import { VenuesPage } from "../pages/Courses/Venues/Venues";
import { LocationPage } from "../pages/Courses/Location/Location";
import { CatygoriesPage } from "../pages/Courses/category/CatygoriesPage";
import { Trainers } from "../pages/Users/Trainers/Trainers";
import { TrainerInfo } from "../pages/Users/Trainers/TrainerInfo";
import { TraineesPage } from "../pages/Users/Trainees/Trainees";
import { TraineeInfo } from "../pages/Users/Trainees/Trainee";
import { ExamConstants } from "../pages/Exams/ExamConstatnts/ExamConstatnt";
import { AddCoursePage } from "../pages/Courses/Course/AddCourse";
import { CoursesPage } from "../pages/Courses/Course/CoursesPage";
import { CourseDetails } from "../pages/Courses/Course/CourseDetails/CourseDetails";
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
import { EditTrainerPage } from "../pages/Users/Trainers/EditTrainer";
import { EditTrainee } from "../pages/Users/Trainees/EditTrainee";
import { TrainerProfile } from "../pages/Users/Trainers/Profile";
import { EditTrainer } from "../pages/Users/Trainers/EditMe";
import { CurrencyPage } from "../pages/Currency/Currency";
import { RequestPage } from "@mui/icons-material";
import { RequestedCoursePage } from "../pages/Courses/Requested/RequestePage";
import { OneRequestedCourse } from "../pages/Courses/Requested/OneRequest";
import { OneRegistrationDetails } from "../pages/Courses/Course/CourseDetails/Registration/OneRegistrationDetails";
import { MyCoursesPage } from "../pages/Courses/Requested/MyCourse";
import { StudentPage } from "../pages/Courses/Requested/Student";
import { SessionTypes } from "../pages/Sessions/Types";
import { PrioritiesPage } from "../pages/Sessions/Priorities";
import { SessionDetailsPage } from "../pages/Courses/Course/CourseDetails/tabs/SessionDetailsPage";
import { Supervisorspage } from "../pages/Sessions/Supervisors";
import { MySessionsPage } from "../components/Course/Request/MySessions";
import { MySessionsPageSuper } from "../pages/Sessions/supervisor/MySessionPage";
import { MySessionDetails } from "../pages/Sessions/supervisor/MySessionDetails";
import { SessionExamDetails } from "../components/Exam/SessionExam/SessionExamDetails";
import { ExamAssignment } from "../pages/Courses/Course/CourseDetails/tabs/exams/ExamAssignments";
import { OneAssignment } from "../pages/Courses/Course/CourseDetails/tabs/exams/TraineesInfo";
import { TaskDetails } from "../pages/Courses/Course/CourseDetails/tabs/tasks/TaskDetails";

import { CertificateTemplatesPage } from "../pages/Exams/certificates/CertificateTemplatesPage";
import { CertificateTemplateEditorPage } from "../pages/Exams/certificates/CertificateTemplateEditorPage";
import { CertificatesPage } from "../pages/Exams/certificates/CertificatesPage";
import { OneCertificatePage } from "../pages/Exams/certificates/OneCertificatePage";
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
          <Route path="/trainer/profile" element={<TrainerProfile />} />
           <Route path="/trainer/profile/edit/:id" element={<EditTrainer />} />
        <Route path="/masterData/languages" element={<LanguagesPage />} />
        <Route path="users/display" element={<UsersPage/>}/>
        <Route path="users/display/:id" element={<DisplayUserInfo/>}/>
          <Route path="users/display/:id/edit" element={<EditUserPage/>}/>
        <Route path="users/add" element={<AddUserPage/>}/>
        <Route  path="users/trainer" element={<Trainers/>}    />
        <Route  path="users/trainer/:id" element={<TrainerInfo/>}/>
        <Route path="users/trainer/:id/edit" element={<EditTrainerPage/>} />
        <Route path="users/trainees" element={<TraineesPage/>} />
        <Route path="users/trainees/:id" element={<TraineeInfo/>} />
        <Route path="users/trainees/:id/edit" element={<EditTrainee/>} />
        <Route path="users/trainer/addtrainer" element={<TrainerPage/>} />
        <Route path="courses/training-plan" element={<TrainingPlanPage/>} />
        <Route path="masterData/venues" element={<VenuesPage/>} />
        <Route path="masterData/location" element={<LocationPage/>} />
        <Route path="masterData/category" element={<CatygoriesPage/>} />
        <Route path="masterData/currency" element={<CurrencyPage/>} />
           <Route path="/courses/add-course" element={<AddCoursePage/>} />
            <Route path="/courses/mycourses" element={<MyCoursesPage/>} />
              <Route path="/courses/mycourses/mysessions/:id" element={<MySessionsPage/>} />
              <Route path="/session/my-sessions" element={<MySessionsPageSuper/>} />
               <Route path="/session/my-sessions/:id" element={<MySessionDetails/>} />
             <Route path="/courses/mycourses/student/:id" element={<StudentPage/>} />
            <Route path="/courses/requested" element={<RequestedCoursePage/>} />
             <Route path="/courses/requested/:id" element={<OneRequestedCourse/>} />
            <Route path="/courses" element={<CoursesPage/>} />
            <Route path="/courses/:id/sessions/:sId" element={<SessionDetailsPage/>} />
            <Route path="/courses/:id/sessions/:sId/session-exam/:eventId" element={<SessionExamDetails/>} />
            <Route path="/courses/:id" element={<CourseDetails/>} />
             <Route path="/courses/:id/tasks/:taskId" element={<TaskDetails/>} />
            <Route path="/courses/:id/examAssignment/:eventId" element={<ExamAssignment/>} />
             <Route path="/courses/:id/examAssignment/:eventId/:traineeId" element={<OneAssignment/>} />
             <Route path="/courses/:id/registration/:id" element={<OneRegistrationDetails/>} />
            <Route path="/courses/:id/edit" element={<AddCoursePage/>} />
            <Route path="/session/types" element={<SessionTypes/>} />
            <Route path="/session/priorities" element={<PrioritiesPage/>} />
            <Route path="/session/suoervisors" element={<Supervisorspage/>} />
          
        <Route path="assignments/types" element={<ExamConstants/>} />
        <Route path="assignments/forms" element={<FormsPage/>} />
        <Route path="assignments/instances" element={<ExamInstances/>} />
        <Route path="assignments/instances/:id/addQuestion" element={<QuestionFormRoute />} />
        <Route path="/exam-instance/:examInstanceId/edit-question/:questionId" element={<EditQuestionPage/>} />
        <Route path="assignments/exams" element={<ExamPage/>} />
         <Route path="assignments/exams/:id" element={<ExamDetails/>} />
         <Route path="assignments/instances/:id/question/:questionId" element={<QuestionDetails/>} />
        <Route path="assignments/events" element={<EventsPage/>} />
            <Route path="assignments/certificates/templates" element={<CertificateTemplatesPage/>} />
        <Route path="assignments/certificates/templates/new" element={<CertificateTemplateEditorPage/>} />
        <Route path="assignments/certificates/templates/:id/edit" element={<CertificateTemplateEditorPage/>} />
        <Route path="assignments/certificates" element={<CertificatesPage/>} />
        <Route path="assignments/certificates/:id" element={<OneCertificatePage/>} />
        <Route path="assignments/instances/:id" element={<InstanceDetails/>} />
         <Route path="courses/training-plan/add-files" element={<AddFiles/>} />
         <Route path="courses/training-plan/:id" element={<TrainingPlanDetails />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;