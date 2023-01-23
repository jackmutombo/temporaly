const textConstants = {
  shortName: 'inteligro',
  name: 'inteligro',
  images: {
    logo: '/assets/img/logo.svg',
    uploadVector: '/assets/img/uoload_vector.svg',
    bgImage: '64x64 32x32 24x24 16x16',
    header: '/assets/img/header.png',
    profileCircle: '/assets/img/profile-circle.svg',
    chevronRight: 'image/x-icon',
  },
  backendConfigs: {
    serverHost: '',
  },
  cardSize: {
    maxWidth: 400,
    maxHeight: 700,
  },
  validationMessage: {
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
  },
  genericsText: {
    forgotPass: 'Forgot Password?',
    forgotTitle: 'Forgot Your Password?',
    resetLinkMessage:
      'Enter your Email Address and we will send you a link to Reset your password.',
    registerTitle: 'Register with InteliGro',
    loginTitle: 'Login To InteliGro',
    linkSent: 'Password Reset Link Sent!',
    resetTitle: 'Reset Your Password.',
    resetSubTitle: 'Please provide a new password for your new account',
    resetNotice:
      'if your email exists on our system, your will receive an email. Click on the link in your inbox to Reset your Password!',
    deleteConfirmMessage:
      'This action will delete the user from this organisation they will no longer have access',
    deleteConfirmTitle: 'Are you Sure you Want To Delete User?',
    registerLink: {
      start: 'Not a member?',
      end: ' Register Here',
    },
    toastNoty: {
      registerSuccessful: 'Registration successful, please login',
      successTime: 5000,
      failTime: 5000,
    },
    AlreadyLink: {
      start: ' Already a member?',
      end: ' Login Here',
    },
    terms: {
      start: 'By using our site, you agree to the',
      end: 'Terms of Service',
    },
    input: {
      email: {
        name: 'email',
        placeholder: 'Email address',
        label: 'Email',
        id: 'email',
      },
      password: {
        name: 'password',
        placeholder: 'Password',
        label: 'Password',
        id: 'password',
      },
      confirmPassword: {
        name: 'confirmPassword',
        placeholder: 'Confirm Password',
        label: 'Confirm Password',
        id: 'confirmPassword',
      },
      newPassword: {
        name: 'newPassword',
        placeholder: 'New Password',
        label: 'New Password',
        id: 'newPassword',
      },

      cropEntry: {
        cropName: {
          name: 'cropName',
          label: 'Crop Name',
          id: 'cropName',
        },

        subCrop: {
          name: 'subCrop',
          label: 'Sub Crop',
          id: 'subCrop',
        },
        cultivar: {
          name: 'cultivar',
          label: 'Cultivar',
          id: 'cultivar',
        },
        RootStock: {
          name: 'rootStock',
          label: 'RootStock',
          id: 'rootStock',
          placeHolder: 'RootStock',
        },

        ExpectedYield: {
          name: 'expectedYield',
          label: 'Expected Yield',
          id: 'expectedYield',
          placeHolder: 'Expected Yield (T/Ha)',
        },

        GrowRate: {
          name: 'GrowRate',
          label: 'Grow Rate',
          id: 'GrowRate',
        },

        CropSpacing: {
          name: 'CropSpacing',
          label: 'Crop Spacing',
          id: 'CropSpacing',
          placeHolder: 'Crop Spacing',
        },

        Fertilizer: {
          name: 'fertilizer',
          label: 'Fertilizer',
          id: 'fertilizer',
          placeHolder: 'TYpe of Fertilizer',
        },
        FertilizerMethod: {
          name: 'fertilizerMethod',
          label: 'Fertilizer Method',
          id: 'fertilizerMethod',
          placeHolder: 'Fertilizer Method',
        },
        Irrigation: {
          name: 'irrigation',
          label: 'Irrigation',
          id: 'irrigation',
          placeHolder: 'Irrigation',
        },

        IrrigationLines: {
          name: 'irrigationLines',
          label: 'Irrigation Lines per Tree Row',
          id: 'irrigationLines',
          placeHolder: 'Irrigation Lines per Tree Row',
        },

        EmmitorSpacing: {
          name: 'emmitorSpacing',
          label: 'Emmitor Spacing',
          id: 'emmitorSpacing',
          placeHolder: 'Emmitor Spacing (m)',
        },

        EmmitorDelivery: {
          name: 'emmitorDelivery',
          label: 'Emmitor Delivery Rate',
          id: 'emmitorDelivery',
          placeHolder: 'Emmitor Delivery Rate (l/hr)',
        },

        PlantDate: {
          name: 'plantDate',
          label: 'Plant Date',
          id: 'plantDate',
          placeHolder: 'YYY-MM-DD',
        },

        BloomDate: {
          name: 'bloomDate',
          label: 'Bloom Date',
          id: 'bloomDate',
          placeHolder: 'YYY-MM-DD',
        },

        HarvestDate: {
          name: 'harvestDate',
          label: 'Harvest Date',
          id: 'harvestDate',
          placeHolder: 'YYY-MM-DD',
        },
      },
      leafSample: {
        Lab: {
          name: 'labName',
          label: 'Lab',
          id: 'labName',
          placeHolder: 'Lab Name',
        },
        SampleDate: {
          name: 'sampleDate',
          label: 'Sample Date',
          id: 'sampleDate',
          placeHolder: 'YYY-MM-DD',
        },

        Crop: {
          name: 'crop',
          label: 'Crop',
          id: 'crop',
          placeHolder: 'Cultivar',
        },

        N: {
          name: 'n',
          label: 'N(%)',
          id: 'n',
          placeHolder: '100%',
        },

        P: {
          name: 'p',
          label: 'P(%)',
          id: 'p',
          placeHolder: '100%',
        },
        K: {
          name: 'k',
          label: 'K(%)',
          id: 'k',
          placeHolder: '100%',
        },

        Ca: {
          name: 'ca',
          label: 'Ca(%)',
          id: 'ca',
          placeHolder: '100%',
        },

        Mg: {
          name: 'mg',
          label: 'Mg(%)',
          id: 'mg',
          placeHolder: '100%',
        },

        S: {
          name: 's',
          label: 'S(%)',
          id: 's',
          placeHolder: '100%',
        },

        Cl: {
          name: 'cl',
          label: 'Cl(%)',
          id: 'n',
          placeHolder: '100%',
        },

        Na: {
          name: 'na',
          label: 'Na(mg/kg)',
          id: 'na',
          placeHolder: '134.5 mg/kg',
        },

        Mn: {
          name: 'mn',
          label: 'Mn(mg/kg)',
          id: 'mn',
          placeHolder: '134.5 mg/kg',
        },

        Fe: {
          name: 'fe',
          label: 'Fe(mg/kg)',
          id: 'fe',
          placeHolder: '134.5 mg/kg',
        },

        Cu: {
          name: 'cu',
          label: 'Cu(mg/kg)',
          id: 'cu',
          placeHolder: '134.5 mg/kg',
        },

        Zn: {
          name: 'zn',
          label: 'Zn(mg/kg)',
          id: 'zn',
          placeHolder: '134.5 mg/kg',
        },

        B: {
          name: 'b',
          label: 'B(mg/kg)',
          id: 'mn',
          placeHolder: '134.5 mg/kg',
        },

        Mo: {
          name: 'mo',
          label: 'Mo(mg/kg)',
          id: 'mo',
          placeHolder: '134.5 mg/kg',
        },
      },
      soilSample: {
        Lab: {
          name: 'labName',
          label: 'Lab',
          id: 'labName',
          placeHolder: 'Lab Name',
        },

        SampleDate: {
          name: 'sampleDate',
          label: 'Sample Date',
          id: 'sampleDate',
          placeHolder: 'Sample Date',
        },

        Crop: {
          name: 'crop',
          label: 'Crop',
          id: 'crop',
          placeHolder: 'Cultivar',
        },

        DepthTop: {
          name: 'depthTop',
          label: 'Depth Top (cm)',
          id: 'depthTop',
          placeHolder: '50cm',
        },

        DepthBottom: {
          name: 'depthBottom',
          label: 'Depth Bottom (cm)',
          id: 'depthBottom',
          placeHolder: '50cm',
        },

        pH: {
          name: 'ph',
          label: 'pH (Kcl)',
          id: 'ph',
          placeHolder: '8',
        },

        Resistance: {
          name: 'resistance',
          label: 'Resistance',
          id: 'resistance',
          placeHolder: '120 ohms',
        },

        P: {
          name: 'p',
          label: 'P(mg/kg)',
          id: 'p',
          placeHolder: '134.5 mg/kg',
        },

        Cu: {
          name: 'cu',
          label: 'Cu(mg/kg)',
          id: 'cu',
          placeHolder: '134.5 mg/kg',
        },

        Zn: {
          name: 'zn',
          label: 'Zn(mg/kg)',
          id: 'zn',
          placeHolder: '134.5 mg/kg',
        },

        Mn: {
          name: 'mn',
          label: 'Mn(mg/kg)',
          id: 'mn',
          placeHolder: '134.5 mg/kg',
        },

        B: {
          name: 'b',
          label: 'B(mg/kg)',
          id: 'b',
          placeHolder: '134.5 mg/kg',
        },

        Fe: {
          name: 'fe',
          label: 'Fe(mg/kg)',
          id: 'fe',
          placeHolder: '134.5 mg/kg',
        },

        S: {
          name: 's',
          label: 'S(mg/kg)',
          id: 's',
          placeHolder: '134.5 mg/kg',
        },

        Cl: {
          name: 'cl',
          label: 'Cl(mg/kg)',
          id: 'cl',
          placeHolder: '134.5 mg/kg',
        },

        Na: {
          name: 'na',
          label: 'Na(cmol/kg)',
          id: 'na',
          placeHolder: '134.5 cmol/kg',
        },

        K: {
          name: 'k',
          label: 'K(cmol/kg)',
          id: 'k',
          placeHolder: '134.5 cmol/kg',
        },

        H: {
          name: 'h',
          label: 'H(cmol/kg)',
          id: 'h',
          placeHolder: '134.5 cmol/kg',
        },

        Ca: {
          name: 'ca',
          label: 'Ca(cmol/kg)',
          id: 'ca',
          placeHolder: '134.5 cmol/kg',
        },

        Mg: {
          name: 'mg',
          label: 'Mg(cmol/kg)',
          id: 'mg',
          placeHolder: '134.5 cmol/kg',
        },

        C: {
          name: 'c',
          label: 'C(%)',
          id: 'c',
          placeHolder: '100%',
        },

        N: {
          name: 'n',
          label: 'N(%)',
          id: 'n',
          placeHolder: '100%',
        },

        Stone: {
          name: 'stone',
          label: 'Stone(%)',
          id: 'stone',
          placeHolder: '100%',
        },

        Clay: {
          name: 'clay',
          label: 'Clay(%)',
          id: 'clay',
          placeHolder: '100%',
        },
      },

      block: {
        Name: {
          name: 'blockName',
          label: 'Name',
          id: 'blockName',
          placeHolder: 'Block Name',
        },

        Hectares: {
          name: 'hectares',
          label: 'Hectares',
          id: 'hectares',
          placeHolder: 'Hectares',
        },
      },
      farm: {
        Name: {
          name: 'farmName',
          label: 'Name',
          id: 'farmName',
          placeHolder: 'Farm Name',
        },
        ImportText:
          'Upload your excel sheet so that the samples can be imported into the Intelligro system.',
        ImportTitle: 'Import Samples',

        Location: {
          name: 'farmLocation',
          label: 'Location',
          id: 'farmLocation',
          placeHolder: 'Farm Location',
        },

        TotalSize: {
          name: 'totalSize',
          label: 'Total Size',
          id: 'totalSize',
          placeHolder: 'Total size',
        },

        FarmManager: {
          name: 'farmManager',
          label: 'Farm Manager',
          id: 'farmManager',
          placeHolder: 'Farm Manager',
        },

        Email: {
          name: 'email',
          label: 'Email Adress',
          id: 'email',
          placeHolder: 'Email Adress',
        },

        Contact: {
          name: 'contact',
          label: 'Contact Number',
          id: 'contact',
          placeHolder: 'Contact Number',
        },
        CropAdvisor: {
          name: 'cropAdvisor',
          label: 'Crop Advisor',
          id: 'cropAdvisor',
          placeHolder: 'Crop Advisor',
        },

        Tm: {
          name: 'tm',
          label: 'TM',
          id: 'tm',
          placeHolder: 'TM',
        },
      },
    },
    button: {
      admin: 'Admin',
      login: 'Login',
      logout: 'Logout',
      back: 'Back',
      register: 'Register',
      backLogin: ' Back To Login',
      reset: 'Reset Password',
    },
  },
  routes: {
    home: '/',
    farm: '/farm',
    register: '/register',
    resetLinkSent: '/resetLinkSent',
    farmOverview: '/farmOverview',
    blockOverview: 'blockOverview',
    block: '/block',
    forgotPassword: 'forgotPassword',
    resetPassword: 'resetPassword',
    serverError: '/serverError',
    userAdmin: '/adminUsers',
  },
  endpoint: {
    user: {
      login: 'accounts/login',
      logout: 'accounts/logout',
      register: 'accounts/register',
      currentUser: 'accounts/currentUser',
      refreshToken: 'accounts/RefreshToken',
      passwordReset: 'accounts/passwordReset',
    },
  },
};

export default textConstants;
