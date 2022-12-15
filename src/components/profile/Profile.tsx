import * as Yup from "yup";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";

const Header = styled.h2`
  font-size: 24px;
  margin-top: 20px;
  margin-left: 150px;
`;

const Label = styled.label`
  margin-left: 150px;
  margin-right: 20px;
  width: 150px;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  font-family: "Poppins";
  font-size: 18px;
  margin-top: 20px;
  margin-left: 150px;
  background-color: rgba(224, 36, 94, 1);
  color: white;
  border: 0px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
`;

const DisabledSubmitButton = styled(SubmitButton)`
  color: rgba(255, 255, 255, 0.4);
  cursor: default;
  background-color: rgba(224, 36, 94, 0.4);
`;

const InputField = styled(Field)`
  font-family: "Poppins";
  font-size: 16px;
  border-radius: 5px;
  outline: none;
  border: 0px;
`;

const Row = styled.div`
  margin-top: 20px;
`;

const Error = styled.div`
  margin-left: 150px;
  margin-top: 20px;
  font-size: 14px;
  color: red;
`;

interface FormValues {
  name: string;
  email: string;
  favoritePlace: string;
}

const Profile = () => {
  const initialValues: FormValues = {
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
    favoritePlace: localStorage.getItem("userFavoritePlace") || "",
  };

  return (
    <div>
      <Header>Your information</Header>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          localStorage.setItem("userName", values.name);
          localStorage.setItem("userEmail", values.email);
          localStorage.setItem("userFavoritePlace", values.favoritePlace);
          alert("Your data was saved!");
          actions.setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Enter valid email"),
          name: Yup.string().required("Please enter full name"),
        })}
      >
        {({ errors, touched }) => (
          <Form className="column">
            <Row className="row">
              <Label htmlFor="name">Name</Label>
              <InputField id="name" name="name" placeholder="Your Name" />
            </Row>
            {errors.name ? <Error>{errors.name}</Error> : null}
            <Row className="row">
              <Label htmlFor="email">E-Mail</Label>
              <InputField id="email" name="email" placeholder="Your Email" />
            </Row>
            {errors.email && touched.email ? (
              <Error>{errors.email}</Error>
            ) : null}
            <Row className="row">
              <Label htmlFor="favoritePlace">Favorite Place</Label>
              <InputField
                id="favoritePlace"
                name="favoritePlace"
                placeholder="Your Favorite Place"
              />
            </Row>
            {errors.favoritePlace && touched.favoritePlace ? (
              <Error>{errors.favoritePlace}</Error>
            ) : null}
            {(errors.name || errors.email) ? (
              <DisabledSubmitButton type="submit">Submit</DisabledSubmitButton>
            ) : (
              <SubmitButton type="submit">Submit</SubmitButton>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
