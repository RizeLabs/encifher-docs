# Differential Privacy

Differential privacy is a mathematical framework used to quantify and ensure the privacy of individuals within a dataset [1].

The core idea of differential privacy is to ensure that it is difficult to determine whether any specific individual’s data is included in a dataset, even when analyzing the output of an algorithm applied to that dataset. A randomized algorithm is said to satisfy (ϵ,δ) - differential privacy if the inclusion or exclusion of an individual’s data changes the probability of any specific output only slightly.

In the context of differential privacy, ϵ controls the privacy loss, quantifying the maximum difference in output probabilities for neighboring datasets (datasets differing by only one individual). δ represents the probability of a small relaxation in the privacy guarantee, allowing for a slight chance of greater privacy compromise. This framework ensures that the algorithm’s output remains nearly indistinguishable for neighboring datasets, thereby limiting the information leakage about any single data point.

Differential privacy has become a widely adopted standard for privacy-preserving data analysis, offering robust privacy guarantees while enabling valuable statistical insights.


