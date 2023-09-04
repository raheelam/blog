export const CommentsBox = ({
  postComments,
  isloadingComments,
}: {
  postComments?: any[] | null
  isloadingComments: boolean
}) => {
  return (
    <div className="w-full  ml-auto flex flex-col gap-[1.5rem]">
      <h2 className="font-bold text-lg">Comments</h2>
      {(!postComments || postComments.length === 0) && !isloadingComments && (
        <div className="text-center">No comments.</div>
      )}
      <div className="w-full pb-2 max-h-[540px] overflow-y-scroll ">
        {postComments?.map((comment, i) => {
          return (
            <div
              key={comment.body + comment.name}
              className="bg-gray-100 rounded-sm mb-2  p-2 w-full"
            >
              <p className="font-bold">{comment.name}</p>
              {comment.body}
            </div>
          )
        })}
      </div>
    </div>
  )
}
