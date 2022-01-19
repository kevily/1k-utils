---
title: createFormatTime
---

## Types

```typescript
function createFormatTime(
    fn: moment | dayjs,
    format: 'DD' | 'HH' | 'mm' | 'ss',
    dataType?: 'unix' | 'default'
): (time: any | any[], defaultValue?: string) => string
```

## Usage

#### dayjs

```typescript
import dayjs from 'dayjs'
import moment from 'moment'
import createFormatTime from '../src/createFormatTime'
// day
// ----------------------------------------------------------------------
createFormatTime(dayjs || moment, 'DD')('2020-2-2')
createFormatTime(dayjs || moment, 'DD', 'unix')(dayjs('2020-2-2').unix())
// => '2020-02-02'

// second
// ----------------------------------------------------------------------
createFormatTime(dayjs || moment, 'ss')('2020-2-2')
createFormatTime(dayjs || moment, 'ss', 'unix')(dayjs('2020-2-2').unix())
// => '2020-02-02 00:00:00'

// arr, day
// ----------------------------------------------------------------------
const default = ['2020-2-2', '2020-2-5']
const second = ['2020-2-2 00:00:00', '2020-2-5 00:00:00']
const unix = [dayjs('2020-2-2').unix(), dayjs('2020-2-5').unix()]
createFormatTime(dayjs || moment, 'DD')(default)
createFormatTime(dayjs || moment, 'DD', 'unix')(unix)
createFormatTime(dayjs || moment, 'DD')(second)
// => '2020-02-02~2020-02-05'


// arr, second
// ----------------------------------------------------------------------
createFormatTime(dayjs || moment, 'ss')(default)
createFormatTime(dayjs || moment, 'ss', 'unix')(unix)
createFormatTime(dayjs || moment, 'ss')(second)
// => '2020-02-02 00:00:00~2020-02-05 00:00:00''
```

#### other

```typescript
const formatDay = createFormatTime(dayjs || moment, 'DD')
formatDay('')
// => undefined
formatDay([])
// => ''
```
