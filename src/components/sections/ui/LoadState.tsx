import { RefreshCw } from 'lucide-react'
import { useLanguage } from '../../../context/LanguageContext'

interface LoadStateProps {
  loading: boolean
  error: string | null
  onRetry: () => void
  skeleton?: React.ReactNode
  empty?: React.ReactNode
  isEmpty: boolean
}

function LoadState({ loading, error, onRetry, skeleton, empty, isEmpty }: LoadStateProps) {
  const { t } = useLanguage()
  if (loading) return <>{skeleton}</>
  if (error) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6 flex flex-col items-center gap-3 text-center">
        <p className="text-muted text-sm">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:underline"
        >
          <RefreshCw size={14} /> {t('loadstate.retry')}
        </button>
      </div>
    )
  }
  if (isEmpty) return <>{empty}</>
  return null
}

export default LoadState