"use client";
import CreateForm from "@/components/form/CreateForm";
import Form from "@/components/form/Form";
import GetFormData from "@/components/form/GetFormData";
import { useAppSelector } from "@/redux/hooks";
import { selectIsFormActive, selectIsGetFormActive } from "@/redux/slices/form/formSlice";
import GetFormDataPage from "@/components/getForm";

const Home = () => {
  const isFormActive = useAppSelector(selectIsFormActive);
  const isGetFormActive = useAppSelector(selectIsGetFormActive);

  if(isGetFormActive){
    return <GetFormDataPage />
  }

  return isFormActive ? (
    <Form />
  ) : (
    <div className="space-y-4 h-[90vh]">
      <CreateForm />
      <GetFormData />
    </div>
  );
};

export default Home;
