"use client";
import CreateForm from "@/components/form/CreateForm";
import Form from "@/components/form/Form";
import { useAppSelector } from "@/redux/hooks";
import { selectIsFormActive } from "@/redux/slices/form/formSlice";

const Home = () => {
  const isFormActive = useAppSelector(selectIsFormActive);

  return isFormActive ? <Form /> : <CreateForm />;
};

export default Home;
