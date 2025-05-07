import { Slide, toast, ToastContainer, ToastContainerProps, ToastOptions } from "react-toastify";
import '@/styles/scss/toast-message.scss';

type Props = ToastContainerProps & {

};

function ToastMessage(props: Props) {
  return (
    <ToastContainer
      containerId={"app-toast"}
      transition={Slide}
      position="bottom-center"
      className={"app-toast-container"}
      // bodyClassName={"app-toast-body"}
      toastClassName={"app-toast-item"}
      progressClassName={"app-toast-progress"}
      closeButton={false}
      hideProgressBar
      limit={4}
      closeOnClick
      theme="dark"
      icon={false}
      {...props}
    />
  )
};

ToastMessage.toast = (message: string, options?: ToastOptions<string>) => {
  return toast(message, {
    containerId: "app-toast",
    autoClose: 3000,
    ...options,
  });
};

export default ToastMessage;
