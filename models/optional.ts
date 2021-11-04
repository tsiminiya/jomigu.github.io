const optionalResource = (
  resource: any | string | number | null | undefined
) => {
  const checkIfPresent = (value: any | string | number | null | undefined) => {
    return value !== undefined && value !== null
  }

  return {
    isPresent: () => {
      return checkIfPresent(resource)
    },
    filter: (test: Function) => {
      if (checkIfPresent(resource) && test(resource)) {
        return optionalResource(resource)
      }
      return optionalResource(null)
    },
    map: (mapper: Function) => {
      if (checkIfPresent(resource)) {
        return optionalResource(mapper(resource))
      }
      return optionalResource(null)
    },
    flatMap: (mapper: Function) => {
      if (checkIfPresent(resource)) {
        return mapper(resource)
      }
      return optionalResource(null)
    },
    get: () => {
      return resource
    },
    ifPresent: (consumer: Function) => {
      if (checkIfPresent(resource)) {
        consumer(resource)
        return optionalResource(resource)
      }
      return optionalResource(resource)
    },
    orElseGet: (supplierFunc: Function) => {
      if (checkIfPresent(resource)) {
        return null
      }
      return supplierFunc()
    },
    orElse: (value: any | string | number | null | undefined) => {
      if (checkIfPresent(resource)) {
        return resource
      }
      return value
    },
  }
}

export default optionalResource
