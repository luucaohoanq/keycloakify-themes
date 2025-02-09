import { Box, Card, Typography } from '@mui/material'
import { CustomTemplateProps } from './types'
import { LanguageSelect } from '../components/LanguageSelect'

const Template = (props: CustomTemplateProps) => {
  const { children, kcContext, i18n } = props
  const { realm } = kcContext
  const { enabledLanguages } = i18n

  return (
    <Box display='flex' alignItems="center" justifyContent="center" height="100vh">
      <Box maxWidth="400px" minWidth="400px">
        <Card>
          {children}
        </Card>
        <Box display="flex" alignItems="center" style={{ marginTop: "1%" }}>
          <Typography variant='caption'>{realm.displayName}</Typography>
          {enabledLanguages?.length && <LanguageSelect style={{ marginLeft: "auto" }} i18n={i18n} />}
        </Box>
      </Box>
    </Box>
  )
}

export { Template }