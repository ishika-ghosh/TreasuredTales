export const styles = {
  App: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "roboto-medium",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  icon: { display: { xs: "none", md: "flex" }, mr: 1 },
  menuBox: { flexGrow: 1, display: { xs: "flex", md: "none" } },
  responsiveText: {
    mr: 2,
    display: { xs: "flex", md: "none" },
    flexGrow: 1,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  profile: {
    width: "50%",
    height: "50%",
    borderRadius: "50%",
  },
  linkStyle: {
    textDecoration: "none",
    color: "white",
  },
  btnStyle: {
    padding: "0.5rem",
    fontWeight: "400",
    border: "none",
    background: "#f75a4f",
  },
};

export const pages = [
  {
    path: "/",
    name: "Your Collection",
  },
  {
    path: "/shared-with-me",
    name: "Shared With You",
  },
  {
    path: "/groups",
    name: "Groups",
  },
];
export const settings = ["Profile", "Logout"];
