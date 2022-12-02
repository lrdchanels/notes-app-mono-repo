export const notFound = (request, response, next) => {
  // save bad url in database

  // redirect error page
  response.redirect('/')
}
