namespace Marathon.Server.Features.Cache
{
    using System;
    using System.Threading.Tasks;

    using EasyCaching.Core;

    using static Marathon.Server.Features.Common.Constants;

    public class CacheService : ICacheService
    {
        private readonly IEasyCachingProviderFactory cachingProviderFactory;
        private readonly IEasyCachingProvider cachingProvider;

        public CacheService(IEasyCachingProviderFactory cachingProviderFactory)
        {
            this.cachingProviderFactory = cachingProviderFactory;
            this.cachingProvider = this.cachingProviderFactory.GetCachingProvider(Redis.Channel);
        }

        public async Task<string> GetAsync(string key)
        {
            var cacheValue = await this.cachingProvider.GetAsync<string>(key);
            return cacheValue.Value;
        }

        public async Task SetAsync(string key, string value)
        {
            await this.cachingProvider.SetAsync(key, value, TimeSpan.FromDays(100));
        }
    }
}
