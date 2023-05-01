import { useSelector } from "react-redux";
import AddAndUpdate from "./AddAndUpdate";
import AddButton from "../common/AddButton";
import CommonModal from "../common/CommonModal";

export default function AddPost() {
  const open = useSelector((state) => state.modal.modal);
  return (
    <>
      <AddButton title={"ADD NEW"} modal_type="POST" />
      <CommonModal>
        <AddAndUpdate open={open} />
      </CommonModal>
    </>
  );
}
