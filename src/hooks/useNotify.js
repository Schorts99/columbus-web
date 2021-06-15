import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useNotify() {
  const [currentToast, setCurrentToast] = useState();

  return (type, render) => {
    if (currentToast) {
      toast.update(currentToast, { type, render });
    } else {
      setCurrentToast(toast[type](render));
    }
  };
}
