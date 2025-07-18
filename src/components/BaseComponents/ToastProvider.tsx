import * as Toast from '@radix-ui/react-toast';

const ToastProvider = () => (
  <Toast.Provider>
    <Toast.Root>
      <Toast.Title />
      <Toast.Description />
      <Toast.Action altText="Undo" />
      <Toast.Close />
    </Toast.Root>
    <Toast.Viewport />
  </Toast.Provider>
);

export default ToastProvider;
