import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RepositoryInput from "../components/RepositoryInput";
import Button from "../components/Button";
import FeatureGrid from "../components/FeatureGrid";
import HowItWorks from "../components/HowItWorks";
import Background from "../components/Background";
import LoadingOverlay from "../components/LoadingOverlay";
import Footer from "../components/Footer";

import { cloneRepository } from "../services/repository";

export default function Home() {
  const navigate = useNavigate();

  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const getRepositoryName = (url: string) =>
    url
      .split("/")
      .pop()
      ?.replace(".git", "") ?? "";

  const handleAnalyze = async () => {
    if (!repositoryUrl.trim()) {
      toast.error("Please enter a GitHub repository URL.");
      return;
    }

    setLoading(true);

    try {
      await cloneRepository(repositoryUrl);

      const repository = getRepositoryName(repositoryUrl);

      toast.success("Repository analyzed successfully!");

      setTimeout(() => {
        navigate(`/graph?repository=${repository}`);
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze repository.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />

      <LoadingOverlay open={loading} />

      <div className="relative z-10 min-h-screen">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Navbar />

          <Hero />

          <section className="mx-auto mt-16 max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">

            <RepositoryInput
              value={repositoryUrl}
              onChange={setRepositoryUrl}
            />

            <div className="mt-8">

              <Button
                text={
                  loading
                    ? "Analyzing..."
                    : "⚡ Analyze Repository"
                }
                onClick={handleAnalyze}
                disabled={loading}
              />

            </div>

          </section>

          <FeatureGrid />

          <HowItWorks />

          <Footer />

        </div>

      </div>
    </>
  );
}