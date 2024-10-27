import { CommentList } from "./Elements/Molecules/CommentList/CommentList";
import { useHydrate } from "./hooks/useHydrate";

const App = () => {
  useHydrate();
  return (
    <div className="h-screen relative flex items-center justify-center flex-col box-border">
      <CommentList />
    </div>
  );
};

export default App;
