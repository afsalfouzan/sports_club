const yup = require("yup");

const userSchema = (data) => {
  let userschema = yup.object().shape({
    email: yup.string().email().required("Email Required"),
    phone_number: yup.string().required("Phone number Required"),
    password: yup.string().min(4).max(10).required("Password Required"),
    last_name: yup.string().required("Last name Required"),
    first_name: yup.string().required("First name Required"),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  return userschema.validate(data);
};

const resetpasswordSchema = (data) => {
  let userschema = yup.object().shape({
    newpassword: yup.string().min(4).max(10).required("new password Required"),
    confirmpassword: yup.string().oneOf([yup.ref('newpassword'), null], 'Passwords must match'),
  });
  return userschema.validate(data);
};

const clubvalidationSchema = (data) =>{
  let clubSchema = yup.object().shape({
    title: yup.string().required("title Required !!"),
    description: yup.string().required("description Required !!"),
    logo:yup.mixed().required("you should upload an image!!"),
    max_no_attendees: yup.number().integer().required("max_no_attendees Required !!"),

  })
  return clubSchema.validate(data)
}

const clubattendeesvalidation = (data) => {
  let attendeeSchema = yup.object().shape({
    club_id: yup.number().integer().required("club_id Required !!"),
    user_id: yup.number().integer().required("user_id Required !!"),
    status: yup.string().oneOf(["active","inactive","trash"]).required("status Required !!"),
  })
  return attendeeSchema.validate(data)
}

const userloginvalidation = (data) => {
  let attendeeSchema = yup.object().shape({
    password: yup.string().required("Password Required"),
    email: yup.string().email().required("Email Required")
  })
  return attendeeSchema.validate(data)
}

(module.exports = {userSchema, resetpasswordSchema,clubvalidationSchema,clubattendeesvalidation,userloginvalidation});
