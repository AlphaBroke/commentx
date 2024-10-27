type MessageProps = {
  text: string;
};

export const Message = ({ text }: MessageProps) => {
  return (
    <div className="h-full w-full flex items-center justify-center text-white/30 fade-in">
      <p className="text-xl">{text} </p>
    </div>
  );
};
