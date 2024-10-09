import ChartSection from "@/components/ChartSection";
import FilterSection from "@/components/FilterSection";
import { Flex } from "antd";

export const UserPage = () => {
  return (
    <Flex gap={8}>
      <FilterSection />
      <ChartSection />
    </Flex>
  );
};
