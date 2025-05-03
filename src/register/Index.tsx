// import { useState } from "react";
// import {
//   Box,
//   CardContent,
//   TextField,
//   Typography,
//   Stack,
//   Link,
//   Checkbox,
//   FormControlLabel,
//   Paper,
//   FormHelperText,
//   Grid,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import { HintBox } from "../../../components/HintBox";
// import { PageProps } from "../../types";

// const Register = (props: PageProps<"register.ftl">) => {
//   const [loading, setLoading] = useState(false);
//   const { i18n, Template, kcContext } = props;
//   const {
//     url,
//     message,
//     messagesPerField,
//     profile,
//     recaptchaRequired,
//     recaptchaSiteKey,
//     termsAcceptanceRequired,
//   } = kcContext;
//   const { msgStr } = i18n;

//   // Parse profile attributes
//   const { attributesByName = {} } = profile || {};
//   const attributes = Object.entries(attributesByName || {});

//   return (
//     <Template i18n={i18n} kcContext={kcContext}>
//       <Paper elevation={4}>
//         <CardContent sx={{ p: 4 }}>
//           <Box mb={3} textAlign="center">
//             <Typography variant="h4" fontWeight="medium" color="primary">
//               {msgStr("registerTitle", "Create Account")}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mt={1}>
//               {msgStr("registerAccountTitle", "Register a new account")}
//             </Typography>
//           </Box>

//           <form
//             onSubmit={() => setLoading(true)}
//             id="kc-register-form"
//             action={url.registrationAction}
//             method="post"
//           >
//             <Stack spacing={2.5} mb={3}>
//               {/* Username field (if not using email as username) */}
//               {attributesByName.username !== undefined && (
//                 <TextField
//                   id="username"
//                   name="username"
//                   label={msgStr("username")}
//                   defaultValue={attributesByName.username?.value || ""}
//                   error={messagesPerField.existsError("username")}
//                   helperText={messagesPerField.get("username")}
//                   fullWidth
//                   autoComplete="username"
//                   autoFocus
//                   disabled={attributesByName.username?.readOnly === true}
//                   required
//                 />
//               )}

//               {/* Email field */}
//               {attributesByName.email !== undefined && (
//                 <TextField
//                   id="email"
//                   name="email"
//                   type="email"
//                   label={msgStr("email")}
//                   defaultValue={attributesByName.email?.value || ""}
//                   error={messagesPerField.existsError("email")}
//                   helperText={
//                     messagesPerField.get("email") ||
//                     attributesByName.email?.annotations?.inputHelperTextBefore
//                   }
//                   fullWidth
//                   autoComplete="email"
//                   disabled={attributesByName.email?.readOnly === true}
//                   required
//                 />
//               )}

//               {/* First name field */}
//               {attributesByName.firstName !== undefined && (
//                 <TextField
//                   id="firstName"
//                   name="firstName"
//                   label={msgStr("firstName")}
//                   defaultValue={attributesByName.firstName?.value || ""}
//                   error={messagesPerField.existsError("firstName")}
//                   helperText={messagesPerField.get("firstName")}
//                   fullWidth
//                   autoComplete="given-name"
//                   disabled={attributesByName.firstName?.readOnly === true}
//                   required={attributesByName.firstName?.required !== false}
//                 />
//               )}

//               {/* Last name field */}
//               {attributesByName.lastName !== undefined && (
//                 <TextField
//                   id="lastName"
//                   name="lastName"
//                   label={msgStr("lastName")}
//                   defaultValue={attributesByName.lastName?.value || ""}
//                   error={messagesPerField.existsError("lastName")}
//                   helperText={messagesPerField.get("lastName")}
//                   fullWidth
//                   autoComplete="family-name"
//                   disabled={attributesByName.lastName?.readOnly === true}
//                   required={attributesByName.lastName?.required !== false}
//                 />
//               )}

//               {/* Password fields */}
//               <TextField
//                 id="password"
//                 name="password"
//                 type="password"
//                 label={msgStr("password")}
//                 error={messagesPerField.existsError("password")}
//                 helperText={messagesPerField.get("password")}
//                 fullWidth
//                 autoComplete="new-password"
//                 required
//               />

//               <TextField
//                 id="password-confirm"
//                 name="password-confirm"
//                 type="password"
//                 label={msgStr("passwordConfirm")}
//                 error={messagesPerField.existsError("password-confirm")}
//                 helperText={messagesPerField.get("password-confirm")}
//                 fullWidth
//                 autoComplete="new-password"
//                 required
//               />

//               {/* Custom attributes rendering */}
//               {attributes
//                 .filter(
//                   ([name]) =>
//                     !["username", "email", "firstName", "lastName"].includes(
//                       name
//                     )
//                 )
//                 .map(([name, attribute]) => {
//                   // Skip if attribute is undefined
//                   if (!attribute) return null;

//                   const {
//                     displayName,
//                     required = true,
//                     readOnly = false,
//                     annotations = {},
//                     validators = {},
//                     value = "",
//                   } = attribute;

//                   // Handle options type attributes (dropdown select)
//                   if (validators.options?.options) {
//                     const options = validators.options.options;
//                     const optionLabelsPrefix =
//                       annotations.inputOptionLabelsI18nPrefix;

//                     return (
//                       <FormControl
//                         key={name}
//                         fullWidth
//                         error={messagesPerField.existsError(name)}
//                         disabled={readOnly}
//                       >
//                         <InputLabel id={`${name}-label`}>
//                           {displayName}
//                         </InputLabel>
//                         <Select
//                           labelId={`${name}-label`}
//                           id={name}
//                           name={name}
//                           defaultValue={value || ""}
//                           label={displayName}
//                           required={required}
//                         >
//                           {options.map((option) => (
//                             <MenuItem key={option} value={option}>
//                               {optionLabelsPrefix
//                                 ? msgStr(
//                                     `${optionLabelsPrefix}.${option}`,
//                                     option
//                                   )
//                                 : option}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                         {messagesPerField.existsError(name) && (
//                           <FormHelperText>
//                             {messagesPerField.get(name)}
//                           </FormHelperText>
//                         )}
//                       </FormControl>
//                     );
//                   }

//                   // Handle checkbox type attributes
//                   if (annotations.inputType === "multiselect-checkboxes") {
//                     const options = validators.options?.options || [];
//                     const optionLabels = annotations.inputOptionLabels || {};

//                     return (
//                       <Box key={name}>
//                         <Typography variant="subtitle2" mb={1}>
//                           {displayName}
//                         </Typography>
//                         {options.map((option) => (
//                           <FormControlLabel
//                             key={option}
//                             control={
//                               <Checkbox
//                                 name={`${name}[${option}]`}
//                                 value={option}
//                                 disabled={readOnly}
//                                 defaultChecked={value === option}
//                               />
//                             }
//                             label={optionLabels[option] || option}
//                           />
//                         ))}
//                         {messagesPerField.existsError(name) && (
//                           <FormHelperText error>
//                             {messagesPerField.get(name)}
//                           </FormHelperText>
//                         )}
//                       </Box>
//                     );
//                   }

//                   // Default to text input
//                   return (
//                     <TextField
//                       key={name}
//                       id={name}
//                       name={name}
//                       label={displayName}
//                       defaultValue={value || ""}
//                       error={messagesPerField.existsError(name)}
//                       helperText={
//                         messagesPerField.get(name) ||
//                         annotations.inputHelperTextBefore
//                       }
//                       fullWidth
//                       disabled={readOnly}
//                       required={required}
//                     />
//                   );
//                 })}

//               {/* Terms acceptance */}
//               {termsAcceptanceRequired && (
//                 <Box>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         name="termsAccepted"
//                         id="termsAccepted"
//                         required
//                       />
//                     }
//                     label={
//                       <Typography variant="body2">
//                         <span
//                           dangerouslySetInnerHTML={{
//                             __html:
//                               msgStr("termsText") ||
//                               "I agree to the Terms of Service",
//                           }}
//                         />
//                       </Typography>
//                     }
//                   />
//                   {messagesPerField.existsError("termsAccepted") && (
//                     <FormHelperText error>
//                       {messagesPerField.get("termsAccepted")}
//                     </FormHelperText>
//                   )}
//                 </Box>
//               )}

//               {/* reCAPTCHA */}
//               {recaptchaRequired && (
//                 <Box my={2} display="flex" justifyContent="center">
//                   <div
//                     className="g-recaptcha"
//                     data-sitekey={recaptchaSiteKey}
//                   ></div>
//                 </Box>
//               )}

//               {/* Submit button */}
//               <LoadingButton
//                 fullWidth
//                 variant="contained"
//                 loading={loading}
//                 type="submit"
//                 size="large"
//                 sx={{
//                   mt: 1,
//                   py: 1.2,
//                   fontWeight: "medium",
//                 }}
//               >
//                 {msgStr("doRegister")}
//               </LoadingButton>
//             </Stack>

//             {message && (
//               <HintBox
//                 style={{ marginBottom: 16 }}
//                 type={message?.type === "success" ? "info" : message.type}
//                 message={message.summary}
//               />
//             )}

//             {/* Login link */}
//             <Box textAlign="center" mt={2}>
//               <Typography variant="body2">
//                 {msgStr("alreadyHaveAccount", "Already have an account?")}{" "}
//                 <Link href={url.loginUrl} underline="hover">
//                   {msgStr("doLogIn")}
//                 </Link>
//               </Typography>
//             </Box>
//           </form>
//         </CardContent>
//       </Paper>
//     </Template>
//   );
// };

// export { Register };
