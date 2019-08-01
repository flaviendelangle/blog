---
path: "/article/ssr"
date: "2019-08-01"
title: "One year with NextJS"
subtitle: "React hooks and isomorphic code"
---

## Part 1

```js
import { get, has } from 'lodash'
import { useMemo } from 'react'

import useCMSResource from '@hooks/context/useCMSResource'
import useQuery from '@hooks/context/useQuery'

const useExperimentValue = experimentName => {
  const resource = useCMSResource()
  const query = useQuery()

  return useMemo(() => {
    const defaultValue = get(resource, [
      'aBTesting',
      experimentName,
      'variation',
      'value',
    ])
    if (!query.forcedExperiments) {
      return defaultValue
    }

    try {
      const forcedExperiments = JSON.parse(query.forcedExperiments)

      if (has(forcedExperiments, experimentName)) {
        return forcedExperiments[experimentName]
      }

      return defaultValue
    } catch (e) {
      return defaultValue
    }
  }, [experimentName, query.forcedExperiments, resource])
}

export default useExperimentValue
```
