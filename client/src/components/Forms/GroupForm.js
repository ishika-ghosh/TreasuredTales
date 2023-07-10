import { Box, Button, Grid, List, Chip } from "@mui/material";
import Input from "../common/Input";
import UserList from "../common/UserList";

function GroupForm({
  groupData,
  handleMembers,
  handleDelete,
  handleSubmit,
  handleChange,
  inputValue,
  options,
  loading,
  handleInputValue,
}) {
  return (
    <Box sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            label="Group Name"
            name="name"
            value={groupData.name}
            handleChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            maxHeight={100}
            overflow={"scroll"}
            sx={{
              overflowX: "hidden",
              paddingY: "5px",
              paddingLeft: "10px",
              borderRadius: "3px",
            }}
          >
            {groupData.members.map((member) => (
              <Chip
                label={member.email}
                variant="outlined"
                color="secondary"
                onDelete={() => handleDelete(member)}
                key={member._id}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Input
            label="Add members to this group"
            name="members"
            value={inputValue}
            handleChange={(e) => handleInputValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <>
            <Box
              maxHeight={150}
              overflow={"scroll"}
              sx={{ overflowX: "hidden" }}
            >
              {loading ? (
                <span>loading..</span>
              ) : (
                <>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                    }}
                  >
                    {options.map((option) => (
                      <UserList
                        option={option}
                        key={option._id}
                        handleMembers={() => handleMembers(option)}
                      />
                    ))}
                  </List>
                </>
              )}
            </Box>
          </>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Create Group
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GroupForm;
