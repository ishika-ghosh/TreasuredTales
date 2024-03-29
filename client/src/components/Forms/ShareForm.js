import {
  Grid,
  Button,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import ShareIcon from "@mui/icons-material/Share";
import Input from "../common/Input";
import React from "react";
import { grey } from "@mui/material/colors";

function ShareForm({ shareData, handleChange, handleShare }) {
  return (
    <Box sx={{ mt: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Input
            label="Email"
            name="email"
            required
            type="email"
            handleChange={handleChange}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ background: grey[100], mt: 1, borderRadius: 2 }}
        >
          <Typography variant="h6" component="h1" sx={{ mb: 0 }}>
            <LockPersonIcon /> Restricted access
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth required>
              <InputLabel id="demo-standard-select-label">Access</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-standard-select"
                value={shareData.access}
                label="Access"
                name="access"
                onChange={handleChange}
                sx={{ outline: "none" }}
              >
                <MenuItem value={1}>Editor</MenuItem>
                <MenuItem value={2}>Viewer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 1 }}
        onClick={() => handleShare()}
      >
        <ShareIcon /> Share
      </Button>
    </Box>
  );
}

export default ShareForm;
