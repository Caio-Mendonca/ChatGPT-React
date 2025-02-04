export const StyleList = {
  width: '100%',
  bgcolor: 'background.default',
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden',
  textAlign: 'center',
  marginBottom: 1,
  padding: 0,
  maxHeight: '60vh',
  '& ul': { padding: 0 },
  '&::-webkit-scrollbar': { width: 12 },
  '&::-webkit-scrollbar-track': {
    boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    backgroundColor: 'background.default',
    borderRadius: 50
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'primary.main',
    borderRadius: 50
  }
}
  