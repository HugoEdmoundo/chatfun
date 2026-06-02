export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center gap-3 text-muted-foreground'>
        <div className='w-8 h-8 border-2 border-[#2AABEE] border-t-transparent rounded-full animate-spin' />
        <p className='text-sm'>Loading ChatFun...</p>
      </div>
    </div>
  );
}
