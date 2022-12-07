import React, { useState } from "react";

function useToast() {
  const [toast, setToast] = useState({
    title: "",
    description: "",
  });
  const [isOpenToast, setIsOpenToast] = useState(false);

  return [toast, setToast, isOpenToast, setIsOpenToast];
}

export default useToast;
