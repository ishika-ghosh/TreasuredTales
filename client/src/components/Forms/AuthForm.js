import { Grid } from "@mui/material";
import Input from "../common/Input";
import Password from "../common/Password";

function AuthForm({ isSignUp, formData, handleChange }) {
  return (
    <Grid container spacing={2}>
      {isSignUp ? (
        <>
          <Grid item xs={12} sm={6}>
            <Input
              name="firstName"
              required={true}
              label="First Name"
              type="text"
              value={formData.firstName}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              required={true}
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              handleChange={handleChange}
            />
          </Grid>
        </>
      ) : null}
      <Grid item xs={12}>
        <Input
          required={true}
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Password
          handleChange={handleChange}
          name="password"
          value={formData.password}
          label="Password"
        />
      </Grid>
      {isSignUp && (
        <Grid item xs={12}>
          <Password
            handleChange={handleChange}
            name="confirmPassword"
            label="confirm Password"
            value={formData.confirmPassword}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default AuthForm;
