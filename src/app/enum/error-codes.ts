export enum ErrorCodes {
  ATT_001_ERR = 'This attendance not exist',

  CARD_001_ERR= 'Card not created.',
  CARD_002_ERR = 'This card not exist.',
  CARD_003_ERR = 'Card not asssigned.',
  CARD_004_ERR = 'This card already deleted.',
  CARD_005_ERR = 'This card already assigned.',
  CARD_006_ERR = 'Card not deleted.',
  CARD_007_ERR = 'Another card already assigned.',
  CARD_008_ERR = 'Card mismatch.',

  FORM_001_ERR = 'Form value is empty.',
  FORM_002_ERR = 'Invalid id.',
  FORM_003_ERR = 'Form value is null.',
  FORM_004_ERR = 'Invalid form value.',

  PWR_001_ERR = 'Reset code is not exist.',
  PWR_002_ERR = 'Password reset code expired.',
  PWR_003_ERR = 'Password reset code is invalid.',

  ROLE_001_ERR = 'Role not exist.',

  STUD_001_ERR = 'Student not exist.',
  STUD_002_ERR = 'Student not saved.',


  USER_001_ERR = 'Invalid username or password.',
  USER_002_ERR = 'User is already activated.',
  USER_003_ERR = 'This email address is already taken',
  USER_004_ERR = 'Use is already deleted.',
  USER_005_ERR = 'User not activated.',
  USER_006_ERR = 'User not deleted.',
  USER_007_ERR = 'This user is not exist.',
  USER_008_ERR = 'User not saved',
  USER_009_ERR = 'User is already deleted.',

  WG_001_ERR = 'User is not added to workgroup.',
  WG_002_ERR = 'Workgroup not created',
  WG_003_ERR = 'Workgroup not exist.',
  WG_004_ERR = 'Workgroup already deleted.',
  WG_005_ERR = 'Workgroup not deleted.',
  WG_006_ERR = 'This user already added to workgroup.',

  WGS_001_ERR = 'Workgroup schedule not created.',
  WGS_002_ERR = 'Workgroup schedule not deleted.',
  WGS_003_ERR = 'This workgroup schedule is not exist.'

}
