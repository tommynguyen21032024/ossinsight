import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {getRandomColor} from "../../lib/color";
import {Alert, debounce, Snackbar} from "@mui/material";
import {createHttpClient} from "../../lib/request";
import useSWR from "swr";
import {UseAutocompleteProps} from "@mui/base/AutocompleteUnstyled/useAutocomplete";

const httpClient = createHttpClient();

export interface Repo extends Record<string, unknown> {
  id: number
  name: string
  color: string
}

export interface RepoSelectorProps {
  label: string
  defaultRepoName?: string
  repo: Repo | null
  onChange: (repo: Repo | null) => void
  onValid: (repo: Repo | null) => string | undefined
  disableClearable?: boolean
}

export default function RepoSelector({repo, label, defaultRepoName, onChange, onValid, disableClearable}: RepoSelectorProps) {
  const [keyword, setKeyword] = useState<string>(defaultRepoName ?? '')
  const [textFieldError, setTextFieldError] = useState<boolean>(false)
  const [helperText, setHelperText] = useState<string>('')
  const [dismissError, setDismissError] = useState(false)

  const debouncedSetKeyword = useMemo(() => {
    return debounce(setKeyword, 500)
  }, [setKeyword])

  const {data: options, isValidating: loading, error} = useSWR<Repo[]>([keyword || defaultRepoName, 'search'], {
    fetcher: async (keyword) => {
      try {
        if (!keyword) {
          return []
        }
        const {data: {data}} = await httpClient.get(`/gh/repos/search`, {params: {keyword}})
        return data.map((r) => ({
          id: r.id,
          name: r.fullName,
          color: getRandomColor(),
        }));
      } finally {
        setDismissError(false)
      }
    },
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const onAutoCompleteChange = useCallback((event, newValue: Repo) => {
    const validMessage = onValid(newValue);

    if (validMessage !== undefined) {
      setTextFieldError(true);
      setHelperText(validMessage);
    } else {
      onChange(newValue);
    }
  }, [onValid, onChange])

  const onInputChange: UseAutocompleteProps<any, any, any, any>['onInputChange'] = useCallback(async (event, value, reason) => {
    setHelperText(undefined);
    setTextFieldError(false);
    debouncedSetKeyword(value)
  }, [debouncedSetKeyword])

  const errorMessage = useMemo(() => {
    const errMsg = error?.response?.data?.message || String(error);
    if (errMsg.indexOf('API rate limit exceeded') !== -1) {
      return 'Too frequent to operate, please try again after one minute.'
    }
    return errMsg
  }, [error])

  return (<>
    <Autocomplete<Repo>
      sx={{maxWidth: 300, mx: 'auto'}}
      size="small"
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      getOptionLabel={(option) => option.name}
      options={options ?? []}
      loading={loading}
      value={repo ?? null}
      onChange={onAutoCompleteChange}
      onInputChange={onInputChange}
      disableClearable={disableClearable as any}
      renderInput={(params) => (
        <TextField
          {...params}
          error={textFieldError}
          variant="standard"
          size='small'
          placeholder={label}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            sx: { '::before': { display: 'none' } },
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    <Snackbar open={!!error && !dismissError} autoHideDuration={3000} onClose={() => setDismissError(true)}>
      <Alert severity="error" sx={{width: '100%'}}>{errorMessage}</Alert>
    </Snackbar>
  </>);
}
