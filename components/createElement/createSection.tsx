import { PropsWithChildren } from "react";

interface CreateSectionProps {
  sectionId: string;
  mainData: any;
}

const CreateSection = (props: PropsWithChildren<CreateSectionProps>) => {
  const { children, sectionId, mainData } = props;

  return (
    <div
      id={sectionId}
      key={sectionId}
      {...mainData[sectionId].sectionProps}
      draggable={false}
    >
      {children}
    </div>
  );
};

export default CreateSection;
