import { Button, Card, Flex, Select } from "antd";
import { districtOptions, professionsOptions, timePeriodOptions } from "@/data";
import { useEffect } from "react";
import axios from "axios";
import { useGraphStore } from "@/hooks/useGraphData";

const FilterSection = () => {
  const { setData } = useGraphStore();
  useEffect(() => {
    const getSomeData = async () => {
      const res = await axios.get(
        "https://data.birgunjmun.gov.np/api/v1/data_search?id=064da8ed-dec6-4cce-a54d-84ee9f3ae692&sort=_id asc",
      );
      setData(res.data.result.records);
    };
    getSomeData();
  }, [setData]);

  return (
    <Card title="Select Filters">
      <Flex gap={24} vertical>
        <Flex gap={8} vertical>
          <Flex gap={8} align="center" justify="start">
            <Flex vertical>
              <h3>Select District:</h3>
              <Select
                size="middle"
                showSearch
                placeholder="Select a district"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={districtOptions}
              />
            </Flex>
            <Flex vertical>
              <h3>Select Category:</h3>
              <Select
                size="middle"
                showSearch
                placeholder="Select a category"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={professionsOptions}
              />
            </Flex>
          </Flex>
          <Flex vertical>
            <h3>Select Time Period:</h3>
            <Select
              size="middle"
              showSearch
              placeholder="Select time Period"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={timePeriodOptions}
            />
          </Flex>
        </Flex>
        <Button type="primary">Filter</Button>
      </Flex>
    </Card>
  );
};

export default FilterSection;
