const systemStatuses = [
  { id: 1, label: 'API Server', description: 'Operational, fully connected', online: true },
  { id: 2, label: 'Backup Service', description: 'Last run 2 hours ago', online: true },
  { id: 3, label: 'Email Service', description: 'Currently unavailable', online: false },
];

export default function SystemStatus() {
  return (
    <div className='bg-white shadow-sm border border-gray-100 rounded-2xl p-6 h-full'>
      <h2 className='text-lg font-bold text-[#41431B] mb-4'>System Status</h2>

      <div className='flex flex-col gap-4'>
        {systemStatuses.map((status) => (
          <div key={status.id} className='flex justify-between items-center'>
            <div className='flex flex-col'>
              <span className='font-medium text-sm'>{status.label}</span>
              <span className='text-xs text-gray-500'>{status.description}</span>
            </div>
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                status.online ? 'bg-[#AEB784]' : 'bg-gray-300'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}