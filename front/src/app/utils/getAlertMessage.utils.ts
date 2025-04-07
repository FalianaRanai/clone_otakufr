import { ToastrService } from 'ngx-toastr';

export const getAlertSuccessMessage = (
  toastr: ToastrService,
  message: string,
  title: string = 'Success'
) => {
  toastr.success(message, title, {
    positionClass: 'toast-bottom-right',
    timeOut: 5000,
    extendedTimeOut: 1000,
    tapToDismiss: true,
    closeButton: true,
    progressBar: true,
  });
};

export const getAlertErrorMessage = (
  toastr: ToastrService,
  message: string,
  title: string = 'Error'
) => {
  toastr.error(message, title, {
    positionClass: 'toast-bottom-right',
    timeOut: 5000,
    extendedTimeOut: 1000,
    tapToDismiss: true,
    closeButton: true,
    progressBar: true,
  });
};
