import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { Issue } from "../interfaces";

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
	const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
	await sleep(2);
	console.log(data);
	return data;
};

export function useIssue(issueNumber: number) {
	const issueQuery = useQuery(
		["issue", issueNumber],
		() => getIssueInfo(issueNumber),
		{
			refetchOnWindowFocus: false,
		}
	);

	return { issueQuery };
}