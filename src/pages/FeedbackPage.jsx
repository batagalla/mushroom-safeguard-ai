import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import api from '@/services/api';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const data = await api.getPublicFeedback();
        setFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedback.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(feedback.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Community Feedback</h1>
            <p className="text-muted-foreground">
              See what our community is saying about their mushroom identifications
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-mushroom-primary" />
            </div>
          ) : feedback.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p>No feedback available at this time.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {currentItems.map((item) => (
                  <FeedbackCard key={item._id} feedback={item} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => handlePageChange(index + 1)}
                          isActive={currentPage === index + 1}
                          className="cursor-pointer"
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

const FeedbackCard = ({ feedback }) => {
  if (!feedback) return null;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{feedback.user?.name || 'Anonymous User'}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {new Date(feedback.date).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        {feedback.image && (
          <div className="mb-4">
            <div className="relative rounded-md overflow-hidden aspect-video mb-3">
              <img 
                src={feedback.image.url} 
                alt="Mushroom" 
                className="object-cover w-full h-full"
              />
              {feedback.image.classification && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-3 py-1">
                  <p className="text-sm">
                    Classified as: <span className={feedback.image.classification.classification === 'edible' ? 'text-green-400' : 'text-red-400'}>
                      {feedback.image.classification.classification === 'edible' ? 'Edible' : 'Poisonous'}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <p className="text-sm">{feedback.text}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackPage;
