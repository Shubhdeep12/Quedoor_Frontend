'use client'
import { toast } from "react-toastify"

const NotFound = () => {
	return (
		<section className='flex flex-col items-start gap-5 min-h-[500px] font-semibold'>
			
      OOPS! Page not found.
      <button onClick={() => toast.error('erorrrrr')}>click</button>
		
		</section>
	)
}

export default NotFound
