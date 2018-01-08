let baseURL: string = "http://tap-backend-qa.5sol.co.uk/";
export const environment = {
  production: true,
  BASE_URL: baseURL,
  TOKEN_URL: baseURL + "token",
  TEACHER_GET_URL: baseURL + "api/teacher/get",
  TEACHER_POST_URL: baseURL + "api/teacher/create",
  STUDENT_GET_URL:baseURL + "api/student/get",
  STUDENT_POST_URL: baseURL + "api/student/create",
  PARENT_GET_URL:baseURL + "api/parent/get",
  PARENT_POST_URL: baseURL + "api/parent/create",
};
