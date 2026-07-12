export interface Algorithm {
  id: string;
  name: string;
  whyIUseIt: string;
  realExample: string;
  output: string;
  tier: 1 | 2 | 3;
}

export interface AlgorithmCategory {
  category: string;
  description: string;
  algorithms: Algorithm[];
}

export const algorithmCategories: AlgorithmCategory[] = [
  {
    category: "Statistical Testing",
    description: "Validate assumptions and measure statistical significance.",
    algorithms: [
      {
        id: "hypothesis-testing",
        name: "Hypothesis Testing",
        whyIUseIt: "Validate assumptions on transaction metrics",
        realExample: "Comparing customer service session times before and after an interface layout update.",
        output: "A calculated p-value indicating whether the change is statistically significant.",
        tier: 1
      },
      {
        id: "ab-testing",
        name: "A/B Testing",
        whyIUseIt: "Compare conversion path layouts",
        realExample: "Testing checkout button copy variations to identify which drives more conversions.",
        output: "Statistically validated conversions difference delta.",
        tier: 1
      },
      {
        id: "t-test",
        name: "T-Test",
        whyIUseIt: "Compare means between two groups",
        realExample: "Checking if the average monthly spend differs between mobile and desktop users.",
        output: "T-score and probability bounds indicating if the means statistically diverge.",
        tier: 1
      },
      {
        id: "chi-square",
        name: "Chi-Square Test",
        whyIUseIt: "Test relationship between categories",
        realExample: "Validating if purchase category choices are associated with user membership tiers.",
        output: "Verification of dependency significance between categorical variables.",
        tier: 3
      },
      {
        id: "anova",
        name: "ANOVA",
        whyIUseIt: "Compare means across 3+ groups",
        realExample: "Testing average order values across North America, Europe, and Asia regions.",
        output: "F-statistic showing whether at least one regional mean significantly deviates.",
        tier: 3
      }
    ]
  },
  {
    category: "Relationship & Prediction",
    description: "Identify correlation links and predict numeric targets.",
    algorithms: [
      {
        id: "linear-regression",
        name: "Linear Regression",
        whyIUseIt: "Forecast numerical target outputs",
        realExample: "Predicting total quarterly revenue based on monthly advertising spend budgets.",
        output: "A linear trend equation mapping spend increments to revenue yields.",
        tier: 1
      },
      {
        id: "logistic-regression",
        name: "Logistic Regression",
        whyIUseIt: "Model binary customer choices",
        realExample: "Predicting the probability that an active user will renew their annual contract.",
        output: "An individual customer probability risk score between 0 and 1.",
        tier: 2
      },
      {
        id: "correlation-analysis",
        name: "Correlation Analysis",
        whyIUseIt: "Identify co-movement between metrics",
        realExample: "Evaluating if active app sessions align with monthly order frequency volumes.",
        output: "A Pearson correlation coefficient showing direction and strength.",
        tier: 1
      },
      {
        id: "multivariate-regression",
        name: "Multivariate Regression",
        whyIUseIt: "Predict metrics using multiple inputs",
        realExample: "Estimating customer lifetime value using tenure, order counts, and ticket rates.",
        output: "Multi-variable trend weights mapping individual variable contributions.",
        tier: 3
      }
    ]
  },
  {
    category: "Classification",
    description: "Assign records to target categories or segments.",
    algorithms: [
      {
        id: "decision-trees",
        name: "Decision Trees",
        whyIUseIt: "Break down complex user behaviors",
        realExample: "Segmenting customer churn risk based on tenure thresholds and usage levels.",
        output: "A clean decision flowchart outlining threshold categorization rules.",
        tier: 1
      },
      {
        id: "random-forest",
        name: "Random Forest",
        whyIUseIt: "Build robust classification pools",
        realExample: "Detecting fraudulent transaction alerts using an ensemble of decision trees.",
        output: "A consolidated consensus classification tag of transaction risk level.",
        tier: 2
      },
      {
        id: "knn",
        name: "K-Nearest Neighbors (KNN)",
        whyIUseIt: "Group records based on proximity",
        realExample: "Recommending subscription plan tiers based on similar user spending levels.",
        output: "Assigned classification tag matching the nearest neighbors' properties.",
        tier: 3
      },
      {
        id: "naive-bayes",
        name: "Naive Bayes",
        whyIUseIt: "Perform quick probability classifications",
        realExample: "Categorizing customer support emails into automated routing queues.",
        output: "The most probable department queue label based on tag frequency.",
        tier: 3
      }
    ]
  },
  {
    category: "Clustering & Segmentation",
    description: "Group similar records without pre-defined labels.",
    algorithms: [
      {
        id: "kmeans",
        name: "K-Means Clustering",
        whyIUseIt: "Segment user bases into groups",
        realExample: "Grouping customers into distinct buyer personas using lifetime value and frequency.",
        output: "Segment labels indicating individual customer cohort assignments.",
        tier: 1
      },
      {
        id: "hierarchical-clustering",
        name: "Hierarchical Clustering",
        whyIUseIt: "Model hierarchical relationships",
        realExample: "Creating nested product category structures based on purchasing overlaps.",
        output: "A dendrogram tree mapping segment nesting levels.",
        tier: 2
      },
      {
        id: "rfm",
        name: "RFM Segmentation",
        whyIUseIt: "Group customers by buying behavior",
        realExample: "Segmenting user bases into 'Champions' or 'At Risk' using Recency, Frequency, and Monetary scores.",
        output: "Targeted customer groups mapping behavioral value segments.",
        tier: 3
      }
    ]
  },
  {
    category: "Time Series & Forecasting",
    description: "Analyze sequential values and forecast trends.",
    algorithms: [
      {
        id: "moving-average",
        name: "Moving Average",
        whyIUseIt: "Smooth out seasonal metric noise",
        realExample: "Tracking underlying sales growth trends using a rolling 30-day window.",
        output: "A smoothed rolling average line chart overlaying raw sales variance.",
        tier: 1
      },
      {
        id: "exponential-smoothing",
        name: "Exponential Smoothing",
        whyIUseIt: "Forecast short-term demand metrics",
        realExample: "Predicting warehouse inventory constraints for next week based on daily sales.",
        output: "Short-term forecast values with higher weight given to recent intervals.",
        tier: 3
      },
      {
        id: "arima",
        name: "ARIMA",
        whyIUseIt: "Project seasonal sales performance",
        realExample: "Forecasting monthly recurring revenue (MRR) for the next fiscal year.",
        output: "Forecast values paired with statistical confidence intervals.",
        tier: 2
      },
      {
        id: "trend-decomposition",
        name: "Trend Decomposition",
        whyIUseIt: "Isolate seasonality and cycles",
        realExample: "Evaluating if recent sales growth is organic or driven by holiday seasonality.",
        output: "Disentangled trend, seasonal, and noise lines plotted separately.",
        tier: 3
      }
    ]
  },
  {
    category: "Optimization & Reduction",
    description: "Maximize efficiencies and compress variable spaces.",
    algorithms: [
      {
        id: "pca",
        name: "Principal Component Analysis (PCA)",
        whyIUseIt: "Collapse multi-dimensional variables",
        realExample: "Compressing 50 customer survey response columns into 3 core satisfaction factors.",
        output: "Reduced component weights explaining maximum variance bounds.",
        tier: 2
      },
      {
        id: "linear-programming",
        name: "Linear Programming",
        whyIUseIt: "Optimize resource allocation margins",
        realExample: "Distributing warehouse order shipping targets to minimize freight costs.",
        output: "The optimal combination that minimizes logistics costs.",
        tier: 3
      }
    ]
  },
  {
    category: "Recommendation & Association",
    description: "Map association rules and recommend items.",
    algorithms: [
      {
        id: "market-basket",
        name: "Market Basket Analysis",
        whyIUseIt: "Uncover product purchase links",
        realExample: "Determining if users purchasing item A are likely to bundle item B.",
        output: "Rules mapping confidence and lift coefficients between items.",
        tier: 3
      },
      {
        id: "collaborative-filtering",
        name: "Collaborative Filtering",
        whyIUseIt: "Build recommendation systems",
        realExample: "Suggesting video tutorials based on matching other similar users' viewing cycles.",
        output: "A ranked recommendation index score for each product.",
        tier: 3
      }
    ]
  },
  {
    category: "Anomaly Detection",
    description: "Isolate anomalous records and potential outliers.",
    algorithms: [
      {
        id: "z-score",
        name: "Z-Score Detection",
        whyIUseIt: "Flag outliers on individual dimensions",
        realExample: "Locating transactions with anomalous prices or quantity ranges.",
        output: "A score showing standard deviations from the dataset mean.",
        tier: 3
      },
      {
        id: "isolation-forest",
        name: "Isolation Forest",
        whyIUseIt: "Isolate multi-dimensional anomalies",
        realExample: "Detecting coordinate web farm spam registrations across geographic ports.",
        output: "Anomalous record labels paired with partition isolation index values.",
        tier: 3
      }
    ]
  }
];
