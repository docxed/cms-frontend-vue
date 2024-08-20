export function t(path, isGlobal = false, args = {}) {
  const { t } = useI18n({
    useScope: isGlobal ? 'global' : 'local',
  })
  return t(path, args)
}
