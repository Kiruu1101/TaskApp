import { apiSlice } from "./apiSlice";
import { TASK_URL } from "../utils/baseUrls";

const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTask: builder.query({
      query: (queryParams) => ({
        url: `${TASK_URL}`,
        params: queryParams,
      }),
      providesTags: ["Task"],
      keepUnusedDataFor: 10,
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: `${TASK_URL}`,
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),

    editTask: builder.mutation({
      query: ({ fieldsToUpdate, taskId }) => ({
        url: `${TASK_URL}/single/${taskId}`,
        method: "PATCH",
        body: { ...fieldsToUpdate },
      }),
      invalidatesTags: ["Task"],
    }),
    editChecklistByTaskAndChecklistId: builder.mutation({
      query: ({ taskId, checkListStatus, checklistId }) => ({
        url: `${TASK_URL}/${taskId}/checklist/${checklistId}`,
        body: checkListStatus,
        method: "PATCH",
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TASK_URL}/single/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    getTask: builder.query({
      query: (id) => ({
        url: `${TASK_URL}/single/${id}`,
      }),

      providesTags: ["Task"],
    }),
    getAnalytics: builder.query({
      query: () => ({
        url: `${TASK_URL}/analytics`,
      }),
      providesTags: ["Task"],
      keepUnusedDataFor: 10,
    }),
  }),
});
export const {
  useGetTaskQuery,
  useGetAllTaskQuery,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useEditChecklistByTaskAndChecklistIdMutation,
  useCreateTaskMutation,
  useGetAnalyticsQuery,
} = taskApiSlice;
