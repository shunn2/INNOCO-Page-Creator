import { useQuery } from "react-query";
import api from "../pages/api/Api";
import queryKeys from "../react-query/queryKeys";

interface GetPageInfoProps {
  loginId: string;
  projectName: string;
  pageName: string;
}

const usePage = ({ loginId, projectName, pageName }: GetPageInfoProps) => {
  const { data } = useQuery(queryKeys.data, () =>
    api.getPageInfo({ loginId, projectName, pageName })
  );
  return data;
};

export default usePage;
