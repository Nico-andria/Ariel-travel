const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("dotenv").config();

// Constants
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;
const PHONE_REGEX = /^(?:\+261|0(32|33|34|38))\d{7}$/;

//importing Models
const User = require("../models/userModel");
const UserOTPVerification = require("../models/userOTPVerification");
const ResetPassword = require("../models/resetPassword");

// nodemailer config
const nodemailer = require("nodemailer");
const { error } = require("console");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "votre.smtp.serveur.com",
  port: 587, // ou 465 pour SSL
  secure: false, // true pour le port 465, false pour les autres ports
  auth: {
    user: process.env.AUTH_EMAIL, // votre adresse email
    pass: process.env.AUTH_PASS, // votre mot de passe
  },
});

//testing nodemailer
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for mailing");
    console.log(success);
  }
});

/**
 * Depuis VersaMart wallet
 */
// exports.register = async (req, res) => {
//   try {
//     // check if user already exists
//     let user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res.status(400).send({
//         message: "This user is already signed up",
//         success: false,
//       });
//     }

//     // hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     req.body.password = hashedPassword;

//     if (!EMAIL_REGEX.test(req.body.email)) {
//       return res.status(400).json({ error: "Invalid email address" });
//     }

//     if (!PHONE_REGEX.test(req.body.phoneNumber)) {
//       return res.status(400).json({ error: "Invalid phone number" });
//     }
//     if (!PASSWORD_REGEX.test(req.body.password)) {
//       return res.status(400).json({
//         error:
//           "The password must contain at least 1 lowercase character, 1 uppercase character, 1 number, 1 special character and must be at least 6 characters long and at most 50 characters wide.",
//       });
//     }

//     const newUser = new User(req.body);
//     await newUser.save();
//   .then((result) => {
//handle account verification
//     sendOTPVerificationEmail(result, res);
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(400).json({
//       status: "FAILED",
//       message:
//         " Une erreur est survenue lors de l'enregistrement d'un nouvel utilisateur",
//     });
//   });

//   } catch (error) {
//     res.status(400).send({
//       message: error.message,
//       success: false,
//     });
//   }
// };

exports.register = async (req, res) => {
  try {
    // Vérification des champs obligatoires
    if (!req.body.email || !req.body.password || !req.body.phoneNumber) {
      return res.status(400).json({
        message: "Email, password and phone number are required",
        success: false,
      });
    }

    // Validation de l'email avant de faire la requête à la base
    if (!EMAIL_REGEX.test(req.body.email)) {
      return res.status(400).json({
        message: "Invalid email address",
        success: false,
      });
    }

    // Validation du numéro de téléphone
    if (!PHONE_REGEX.test(req.body.phoneNumber)) {
      return res.status(400).json({
        message: "Invalid phone number",
        success: false,
      });
    }

    // Validation du mot de passe
    if (!PASSWORD_REGEX.test(req.body.password)) {
      return res.status(400).json({
        message:
          "The password must contain at least 1 lowercase character, 1 uppercase character, 1 number, 1 special character and must be at least 6 characters long and at most 50 characters wide.",
        success: false,
      });
    }

    // Vérification si l'utilisateur existe déjà
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({
        // 409 Conflict est plus approprié
        message: "This user is already registered",
        success: false,
      });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Création du nouvel utilisateur
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    // Ne pas renvoyer le mot de passe même hashé dans la réponse
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User successfully registered",
      data: userResponse,
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error); // Log pour le débogage
    res.status(500).json({
      message: "An error occurred during registration",
      error: error.message,
      success: false,
    });
  }
};

// send verification email
const sendOTPVerificationEmail = ({ _id, email }, res) => {
  // url to be used in the email
  const currentUrl = "http://localhost:8800/";

  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Vérification de l'adresse email",
    html: `<p>Pour pouvoir accéder aux services de Happy'Nice Guest House, il faut vérifier que votre adresse email est valide avant de pouvoir vous connecter. Pour cela il vous faut cliquer sur le lien ci-dessous</p>
    <p>Ce lien expore <b> dans 6 heures.</b>.</p>
    <p>Cliquez  <a href=${
      currentUrl + "api/users/verify/" + _id + "/" + uniqueString
    }> pour continuer </a>.</p>`,
  };

  // hash the uniqueString
  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((handleUniqueString) => {
      // set values in userVerification collection
      const newVerification = new UserOTPVerification({
        userId: _id,
        uniqueString: handleUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 2160000,
      });

      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              //email sent and verification record saved
              res.json({
                status: "PENDING",
                message: "L'email de vérification a été envoyé",
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json({
                status: "FAILED",
                message: "La vérification de l'email a échouée",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({
            status: "FAILED",
            message: "Les données de vérification ne peuvent être enregistrées",
          });
        });
    })
    .catch(() => {
      res.status(400).json({
        status: "FAILED",
        message: "Une erreur s'est produite lors du hashage de l'email",
      });
    });
};

// Verify email
exports.verify = (req, res) => {
  let { userId, uniqueString } = req.params;
  UserOTPVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        // user verification record exists so we proceed
        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;

        // checking for expired unique string
        if (expiresAt < Date.now()) {
          UserOTPVerification.deleteOne({ userId })
            .then((result) => {
              User.deleteOne({ _id: userId })
                .then(() => {
                  let message = "Le lien a expiré. Veuillez vous réinscrire";
                  res.redirect(
                    `/api/users/verified/error=true&message=${message}`
                  );
                })
                .catch((error) => {
                  let message =
                    "Échec du nettoyage d'un utilisateur dont la chaîne unique a expiré";
                  res.redirect(
                    `/api/users/verified/error=true&message=${message}`
                  );
                });
            })
            .catch((error) => {
              console.log(error);
              let message =
                "Une erreur s'est produite lors de l'effacement de l'enregistrement de vérification de l'utilisateur expiré.";
              res.redirect(`/api/users/verified/error=true&message=${message}`);
            });
        } else {
          // valid record exists so we validate the user string
          // first compare the hashed unique string
          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                // strings match
                User.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    UserOTPVerification.deleteOne({ userId })
                      .then(() => {
                        res.redirect("http://localhost:3000/emailVerified");
                      })
                      .catch((error) => {
                        console.log(error);
                        let message =
                          "Une erreur s'est produite lors de la finalisation de la vérification";
                        res.redirect(
                          `/api/users/verified/error=true&message=${message}`
                        );
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    let message =
                      "Une erreur s'est produite lors de la mise à jour de l'enregistrement de l'utilisateur à afficher vérifié";
                    res.redirect(
                      `/api/users/verified/error=true&message=${message}`
                    );
                  });
              } else {
                // existing record but incorrect verification details passed
                let message =
                  "Détails de vérification non valides transmis. Vérifiez votre boîte de réception";
                res.redirect(
                  `/api/users/verified/error=true&message=${message}`
                );
              }
            })
            .catch((error) => {
              console.log(error);
              let message =
                "Une erreur s'est produite lors de la comparaison de chaînes uniques";
              res.redirect(`/api/users/verified/error=true&message=${message}`);
            });
        }
      } else {
        // user verification record doesn't exist
        let message =
          "L'enregistrement du compte n'existe pas ou a déjà été vérifié. Veuillez vous inscrire ou vous connecter";
        res.redirect(`/api/users/verified/error=true&message=${message}`);
      }
    })
    .catch((error) => {
      console.log(error);
      let message =
        "Une erreur s'est produite lors de la vérification de l'existence d'un enregistrement de vérification de l'utilisateur.";
      res.redirect(`/api/users/verified/error=true&message=${message}`);
    });
};

exports.verified = (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/verified.html"));
};

exports.login = async (req, res) => {
  try {
    // check if user exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        message: "Cet utilisateur n'existe pas",
        success: false,
      });
    }

    // check if user is verified
    if (!user.verified) {
      return res.status(401).send({
        message: "Cet utilisateur n'est pas encore vérifié",
        success: false,
      });
    } else {
      // check if password is correct
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).send({
          message: "Mot de passe invalide",
          success: false,
        });
      }
      // generate token with JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT, {
        expiresIn: "1d",
      });
      res.send({
        message: "Connexion réussie",
        data: token,
        success: true,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

exports.getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = "";
    res.send({
      message: "User info fetched successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.requestPasswordReset = (req, res) => {
  const { email, redirectUrl } = req.body;

  //check if email exists
  User.find({ email })
    .then((data) => {
      if (data.length) {
        // user exists

        // check if user is verified
        if (!data[0].verified) {
          console.log(error);
          res.json({
            status: "FAILED",
            message:
              "Cet email n'est pas encore vérifié. Veuillez consulter vos mails",
          });
        } else {
          // proceed with email to reset password
          sendResetEmail(data[0], redirectUrl, res);
        }
      } else {
        console.log(error);
        res.json({
          status: "FAILED",
          message: "Aucun compte n'associé à cet email",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message:
          "Une erreur s'est produite lors de la vérification de l'existence d'un utilisateur",
      });
    });
};

// send password reset email
const sendResetEmail = ({ _id, email }, redirectUrl, res) => {
  const resetString = uuidv4() + _id;

  ResetPassword.deleteMany({ userId: _id })
    .then((result) => {
      // Reset records deleted successfully
      // Now we send the email

      // mail options
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Modification mot de passe",
        html: `<p>Quel malheureux incident que vous ayez oublié votre mot de passe.</p>
        <p>Ne vous inquiétez pas, il vous suffit de cliquer le lien ci-dessous pour pouvoir le changer.</p>
      <p>Ce lien <b>expire dans 60 minutes.</b>.</p>
      <p>Cliquez <a href=${
        redirectUrl + "/" + _id + "/" + resetString
      }> ici </a> pour le changer.</p>`,
      };

      // hash the reset string
      const saltRounds = 10;
      bcrypt
        .hash(resetString, saltRounds)
        .then((hashedResetString) => {
          // set values in password reset collection
          const newPasswordReset = new ResetPassword({
            userId: _id,
            resetString: hashedResetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
          });
          newPasswordReset
            .save()
            .then(() => {
              transporter
                .sendMail(mailOptions)
                .then(() => {
                  // reset email sent and password reset record saged
                  res.json({
                    status: "PENDING",
                    message:
                      "Réinitialisation du mot de passe envoyé sur votre email",
                  });
                })
                .catch((error) => {
                  // error while clearing existing records
                  console.log(error);
                  res.json({
                    status: "FAILED",
                    message: "La réinitialisation du mot de passe a échouée",
                  });
                });
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "FAILED",
                message:
                  "Les données de réinitialisation du mot de passe ne peuvent être enregistré",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          res.json({
            status: "FAILED",
            message:
              "Une erreur est survenue lors du hashage des données de réinitialisation du mot de passe",
          });
        });
    })
    .catch((error) => {
      // error while clearing existing records
      console.log(error);
      res.json({
        status: "FAILED",
        message:
          "La suppression des données de réinitialisation du mot de passe existantes a échouée",
      });
    });
};

exports.resetPassword = (req, res) => {
  let { userId, resetString, newPassword } = req.body;

  ResetPassword.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        // password reset record exists so we proceed
        const { expiresAt } = result[0];
        const hashedResetString = result[0].resetString;

        //checking for expired reset string
        if (expiresAt < Date.now()) {
          ResetPassword.deleteOne({ userId })
            .then(() => {
              res.status(401).json({
                status: "FAILED",
                message: "Le lien de réinitialisation du mot de passe a expiré",
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json({
                status: "FAILED",
                message:
                  "La suppression de la réinitialisation du mot de passe a échouée",
              });
            });
        } else {
          // valid reset record exists so we validate the reset string
          // first compare the hashed reset string
          bcrypt
            .compare(resetString, hashedResetString)
            .then((result) => {
              if (result) {
                // strings matched
                //hash password again
                const saltRounds = 10;
                bcrypt
                  .hash(newPassword, saltRounds)
                  .then((hashedNewPassword) => {
                    // upadate user password
                    User.updateOne(
                      { _id: userId },
                      { password: hashedNewPassword }
                    )
                      .then(() => {
                        // update complete. Now delete reset record
                        ResetPassword.deleteOne({ userId })
                          .then(() => {
                            // both user record and reset record updated
                            res.json({
                              status: "SUCCESS",
                              message:
                                "Le mot de passe a bien été réinitialisé avec succès",
                            });
                          })
                          .catch((error) => {
                            console.log(error);
                            res.json({
                              status: "FAILED",
                              message:
                                "Une erreur est survenue lors de la finalisation de la réinitialisation du mot de passe",
                            });
                          });
                      })
                      .catch((error) => {
                        console.log(error);
                        res.status(400).json({
                          status: "FAILED",
                          message:
                            "La modification du mot de passe de l'utilisateur a échouée",
                        });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(400).json({
                      status: "FAILED",
                      message:
                        "Une erreur est survenue lors du hashing du mot de passe",
                    });
                  });
              } else {
                // existing record but incorrect reset string passed
                res.status(400).json({
                  status: "FAILED",
                  message:
                    "Les données de réinitialisation du mot de passe ne sont pas valides",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              res.json({
                status: "FAILED",
                message:
                  "Les données de réinitialisation du mot de passe ne correspondent pas",
              });
            });
        }
      } else {
        // password reset record doesn't exist
        res.status(404).json({
          status: "FAILED",
          message:
            "La requête de réinitialisation du mot de passe est introuvable",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "FAILED",
        message:
          "La vérification de l'existence d'un enregistrement de réinitialisation de mot de passe a échoué",
      });
    });
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Vérifie si l'ID est un ObjectId valide
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur dans getUserById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
