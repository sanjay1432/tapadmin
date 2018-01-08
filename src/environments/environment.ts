// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let baseURL: string = "http://e25e94a8.ngrok.io/";
export const environment = {
  production: false,
  BASE_URL: baseURL,
  TOKEN_URL: baseURL + "token",
  TEACHER_GET_URL: baseURL + "api/teacher/get",
  TEACHER_POST_URL: baseURL + "api/teacher/create",
  STUDENT_GET_URL:baseURL + "api/student/get",
  STUDENT_POST_URL: baseURL + "api/student/create",
  PARENT_GET_URL:baseURL + "api/parent/get",
  PARENT_POST_URL: baseURL + "api/parent/create",
};

