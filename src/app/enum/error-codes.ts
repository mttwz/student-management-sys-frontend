export enum ErrorCodes {
  ATT_001_ERR = 'Attendance does not exist',

  CARD_001_ERR= 'Card does not created.',
  CARD_002_ERR = 'Card does not exist.',
  CARD_003_ERR = 'Card does not assigned.',
  CARD_004_ERR = 'Card is already deleted.',
  CARD_005_ERR = 'Card is already assigned.',
  CARD_006_ERR = 'Card is not deleted.',
  CARD_007_ERR = 'Another Card is already assigned to the student.',
  CARD_008_ERR = 'Card mismatch.',

  FORM_001_ERR = 'One of the required fields is empty',
  FORM_002_ERR = 'The ID is invalid.',
  FORM_003_ERR = 'One or more fields are null.',
  FORM_004_ERR = 'One or more values are invalid',
  FORM_005_ERR = 'The provided password is too short',

  PWR_001_ERR = 'User does not has any valid reset code.',
  PWR_002_ERR = 'User\'s reset code has been expired.',
  PWR_003_ERR = 'Password reset code is invalid.',

  ROLE_001_ERR = 'Role not exist.',

  STUD_001_ERR = 'Student does not exist.',
  STUD_002_ERR = 'Student does not saved.',


  USER_001_ERR = 'Invalid username or password.',
  USER_002_ERR = 'User is already activated.',
  USER_003_ERR = 'This email address is already taken',
  USER_004_ERR = 'User is deleted.',
  USER_005_ERR = 'User is not activated yet.',
  USER_006_ERR = 'User is not deleted.',
  USER_007_ERR = 'This user does not exist.',
  USER_008_ERR = 'User does not saved',
  USER_009_ERR = 'User is already deleted.',

  WG_001_ERR = 'User does not added to the workgroup.',
  WG_002_ERR = 'Workgroup does not created',
  WG_003_ERR = 'Workgroup does not exist.',
  WG_004_ERR = 'Workgroup is already deleted.',
  WG_005_ERR = 'Workgroup is not deleted.',
  WG_006_ERR = 'This user already added to the workgroup.',

  WGS_001_ERR = 'Workgroup schedule does not created.',
  WGS_002_ERR = 'Workgroup schedule does not deleted.',
  WGS_003_ERR = 'This workgroup schedule does not exist.'

}
