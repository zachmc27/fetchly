import PostTypeDropdown from "../components/Reusables/Dropdown";
import AuthForm from "../pages/Login";
import PostButton from "../components/Navbar/PostButton";
import { usePostModal } from "../components/Reusables/PostModalProvider";

export default function Home() {
  const { openModalWithType } = usePostModal();

  return (
    <div>
      <AuthForm />
      <h1>Home</h1>
      <PostButton
      />
      <div>
        <PostTypeDropdown onSelect={openModalWithType} />
      </div>
    </div>
  );
}
